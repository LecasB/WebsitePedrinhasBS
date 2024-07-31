// script.js
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

    
    if (slideIndex === 0) {
        prevButton.classList.add('hidden');
    } else {
        prevButton.classList.remove('hidden');
    }

    if (slideIndex === slides.length - 1) {
        nextButton.classList.add('hidden');
    } else {
        nextButton.classList.remove('hidden');
    }
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function prevSlide() {
    slideIndex--;
    showSlides();
}

document.addEventListener('DOMContentLoaded', function () {
    showSlides();

    document.querySelector('.prev').addEventListener('click', function () {
        prevSlide();
    });

    document.querySelector('.next').addEventListener('click', function () {
        nextSlide();
    });

    setInterval(nextSlide, 4000);
});
