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
        const nextBtn = container.querySelector(".next");
        const prevBtn = container.querySelector(".prev");

        function moveSlide(step) {
            slideIndex += step;

            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }

            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

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
let dots = document.querySelectorAll('.indicator-dot');
let currentIndex = 1;
let isTransitioning = false;

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function moveSlide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    if (direction === 1) {
        currentIndex = (currentIndex + 1) % items.length;
    } else {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    items.forEach((item, index) => {
        item.classList.remove('prev', 'active', 'next');
    });

    let prevIndex = (currentIndex - 1 + items.length) % items.length;
    let nextIndex = (currentIndex + 1) % items.length;

    items[prevIndex].classList.add('prev');
    items[currentIndex].classList.add('active');
    items[nextIndex].classList.add('next');

    let activeVideo = items[currentIndex].querySelector("video");
    activeVideo.play();
    items.forEach((item, idx) => {
        if (idx !== currentIndex) {
            let video = item.querySelector("video");
            video.pause();
        }
    });

    updateDots();
    setTimeout(() => isTransitioning = false, 700);
}

setInterval(() => moveSlide(1), 4000);

document.querySelector('.control-btn:first-child').addEventListener('click', () => moveSlide(-1));
document.querySelector('.control-btn:last-child').addEventListener('click', () => moveSlide(1));