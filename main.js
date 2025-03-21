// AOS Library
AOS.init();

// Menu Box
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    menuIcon.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
});

// Slider 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slider-container").forEach((container) => {
        let slideIndex = 0;
        const slider = container.querySelector(".slider");
        const slides = container.querySelectorAll(".slide");
        const totalSlides = slides.length;
        const nextBtn = container.querySelector("#next");
        const prevBtn = container.querySelector("#prev");

       
        function getSlidesPerStep() {
            return window.innerWidth > 768 ? 2 : 1; 
        }

        function getSlideWidth() {
            return slides[0].clientWidth;
        }

        function moveSlide(direction) {
            const step = getSlidesPerStep();
            slideIndex += direction * step;

            if (slideIndex >= totalSlides) {
                slideIndex = 0;
            } else if (slideIndex < 0) {
                slideIndex = totalSlides - step;
            }

            slider.style.transform = `translateX(-${slideIndex * getSlideWidth()}px)`;
        }

        window.addEventListener("resize", () => {
            slider.style.transform = `translateX(-${slideIndex * getSlideWidth()}px)`;
        });

        nextBtn.addEventListener("click", () => moveSlide(1));
        prevBtn.addEventListener("click", () => moveSlide(-1));
    });
});




// Number Counting Animation
document.addEventListener("DOMContentLoaded", function () {
    function startCounting(element, start, end, duration, suffix = "") {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(function () {
            current += increment;
            element.textContent = `+${current}${suffix}`;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    let observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let numbers = document.querySelectorAll(".numbers .num h2");
                    numbers[0].textContent = "+0";
                    numbers[1].textContent = "+0";
                    numbers[2].textContent = "+0";

                    startCounting(numbers[0], 0, 10, 2500);
                    startCounting(numbers[1], 0, 700, 1);
                    startCounting(numbers[2], 0, 10, 1000);

                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(document.querySelector(".numbers"));
});


// course sidebar select
function toggleChapter(element) {
    element.classList.toggle('active');
    let lessonList = element.nextElementSibling;
    if (lessonList.style.display === "block") {
        lessonList.style.display = "none";
    } else {
        lessonList.style.display = "block";
    }
    const arrow = element.querySelector("#arrow"); 
        
    arrow.classList.toggle("active");

}

// Phone Number Input
document.addEventListener("DOMContentLoaded", function () {
    fetch("countries.json") 
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById("country-select");
            const flagIcon = document.getElementById("flag-icon");
            const countryCode = document.getElementById("country-code");

            data.forEach(country => {
                let option = document.createElement("option");
                option.value = JSON.stringify({ code: country.code, dialCode: country.dial_code });
                option.innerHTML = `${country.name} (${country.dial_code})`;
                countrySelect.appendChild(option);
            });

            function updatePhoneInfo() {
                let selectedData = JSON.parse(countrySelect.value);
                flagIcon.src = `https://flagcdn.com/w40/${selectedData.code.toLowerCase()}.png`;
                countryCode.textContent = selectedData.dialCode;
            }

            countrySelect.addEventListener("change", updatePhoneInfo);

            let defaultOption = Array.from(countrySelect.options).find(option => option.value.includes('+20'));
            if (defaultOption) {
                countrySelect.value = defaultOption.value;
                updatePhoneInfo();
            }
        })
        .catch(error => console.error("فشل تحميل قائمة الدول", error));
});

// 3d Slider
let items = document.querySelectorAll('.carousel-item');
let dotsContainer = document.querySelector('.indicator-dots');
let positions = [];
let currentIndex = 1;
let autoSlideInterval;

function setupCarousel() {
    dotsContainer.innerHTML = "";
    positions = Array(items.length).fill("hidden");

    if (items.length >= 2) {
        positions[0] = "prev";
        positions[1] = "active";
        positions[2] = "next";
    }

    items.forEach(() => {
        const dot = document.createElement("div");
        dot.classList.add("indicator-dot");
        dotsContainer.appendChild(dot);
    });

    updateCarousel();
    restartAutoSlide();
}

function updateCarousel() {
    items.forEach((item, index) => {
        item.className = `carousel-item ${positions[index] || "hidden"}`;
    });

    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function moveSlide(direction) {
    if (direction === 1) {
        positions.unshift(positions.pop());
        currentIndex = (currentIndex + 1) % items.length;
    } else {
        positions.push(positions.shift());
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    updateCarousel();
    restartAutoSlide();
}

function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => moveSlide(1), 10000);
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(autoSlideInterval);
    } else {
        restartAutoSlide();
    }
});

setupCarousel();

// Notifaction
document.getElementById("markAllRead").addEventListener("click", function() {
    document.querySelectorAll(".notification-item").forEach(item => {
        item.classList.remove("unread");
        item.querySelector(".mark-read").checked = true;
    });
});

// Open Profile Links
function openProfileLinks() {
    const profileLinks = document.getElementById('profile-links');
    const linksArrIcon = document.querySelector('#links-arr i');

    if (profileLinks.style.right === "50px") {
        profileLinks.style.right = "-2000px";

        linksArrIcon.classList.remove('fa-xmark');
        linksArrIcon.classList.add('fa-angles-left'); 
    } else {

        profileLinks.style.right = "50px";
        linksArrIcon.classList.remove('fa-angles-left');
        linksArrIcon.classList.add('fa-xmark');
    }
}

function openProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');

    if (profileMenu.style.left === "50px") {
        profileMenu.style.left = "-2000px";
    } else {
        profileMenu.style.left = "50px";
    }
}
