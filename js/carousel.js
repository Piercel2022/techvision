// carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        currentSlide: 0,
        slides: [
            {
                image: 'images/ab.png',
                title: 'Transformation digitale - Société ABC',
                description: 'Modernisation complète de l\'infrastructure IT'
            },
            {
                image: 'images',
                title: 'Application sur mesure - XYZ Corp',
                description: 'Développement d\'un ERP personnalisé'
            },
            {
                image: 'images',
                title: 'Migration cloud - Tech Start-up',
                description: 'Transition réussie vers une infrastructure cloud'
            },
            {
                image: 'images',
                title: 'Developement web - Tech Start-up',
                description: 'Transition réussie vers le Dévelopment numérique'
            }
        ],
        
        init: function() {
            this.wrapper = document.querySelector('.carousel-wrapper');
            this.prevButton = document.querySelector('.carousel-prev');
            this.nextButton = document.querySelector('.carousel-next');
            
            this.createSlides();
            this.bindEvents();
            this.showSlide(0);
        },
        
        createSlides: function() {
            this.slides.forEach((slide, index) => {
                const slideElement = document.createElement('div');
                slideElement.className = 'carousel-slide';
                slideElement.innerHTML = `
                    <img src="${slide.image}" alt="${slide.title}">
                    <div class="slide-content">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                `;
                this.wrapper.appendChild(slideElement);
            });
        },
        
        bindEvents: function() {
            this.prevButton.addEventListener('click', () => this.prevSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());
        },
        
        showSlide: function(index) {
            const slides = this.wrapper.querySelectorAll('.carousel-slide');
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - index)}%)`;
            });
            this.currentSlide = index;
        },
        
        prevSlide: function() {
            const newIndex = this.currentSlide - 1;
            if (newIndex < 0) {
                this.showSlide(this.slides.length - 1);
            } else {
                this.showSlide(newIndex);
            }
        },
        
        nextSlide: function() {
            const newIndex = this.currentSlide + 1;
            if (newIndex >= this.slides.length) {
                this.showSlide(0);
            } else {
                this.showSlide(newIndex);
            }
        }
    };
    
    carousel.init();
});