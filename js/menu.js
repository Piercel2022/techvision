document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("show");
});

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Simple carousel functionality
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    function updateCarousel() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                 
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
                    updateCarousel();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
                    updateCarousel();
                });
            }
            
            // Add click events to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentIndex = index;
                    updateCarousel();
                });
            });
        });
// Script pour le menu hamburger et les dropdowns
document.addEventListener("DOMContentLoaded", function() {
    // Gestion du menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Gestion des FAQ accordéons
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
        
        // Fermer les autres FAQ
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== question) {
            otherQuestion.parentElement.classList.remove('active');
          }
        });
      });
    });
    
    // Animations au scroll
    const animatedElements = document.querySelectorAll('.animate-slide-in');
    
    // Option pour l'Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    // Fonction de callback pour l'observer
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateX(0)';
        }
      });
    };
    
    // Créer l'observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observer chaque élément
    animatedElements.forEach(element => {
      element.style.opacity = 0;
      element.style.transform = 'translateX(-30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(element);
    });
  });