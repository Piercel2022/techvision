/**
 * NetVision Solutions - Main JavaScript
 * Ce fichier gère les fonctionnalités interactives du site web NetVision Solutions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des composants de l'interface
    initNavigation();
    initCarousel();
    initAnimations();
});

/**
 * Initialise le menu de navigation responsive
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Accessibilité: gestion de l'attribut aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Fermeture du menu lorsqu'un lien est cliqué
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Initialise le carrousel de services
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-controls .prev');
    const nextButton = document.querySelector('.carousel-controls .next');
    
    if (!carousel || carouselItems.length === 0) return;

    let currentIndex = 0;
    
    // Créer les indicateurs de pagination (points)
    if (dotsContainer) {
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
    }

    // Mettre à jour l'état actif
    function updateActiveState() {
        // Mise à jour des slides
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Mise à jour des points de navigation
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }

    // Navigation vers un slide spécifique
    function goToSlide(index) {
        currentIndex = index;
        
        // Si carrousel en mode défilement horizontal
        if (carousel.style.display === 'flex') {
            const slideWidth = carouselItems[0].offsetWidth;
            carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        } else {
            // Si carrousel en mode display:block avec active/inactive
            updateActiveState();
        }
    }

    // Navigation vers le slide précédent
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        goToSlide(currentIndex);
    }

    // Navigation vers le slide suivant
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        goToSlide(currentIndex);
    }

    // Ajout des événements pour les boutons de navigation
    if (prevButton) {
        prevButton.addEventListener('click', goToPrevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextSlide);
    }

    // Support des touches clavier pour l'accessibilité
    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (event.key === 'ArrowRight') {
            goToNextSlide();
        }
    });

    // Configuration de l'état initial
    updateActiveState();
    
    // Auto-rotation (optionnel - décommentez pour activer)
    /*
    const autoRotateInterval = 5000; // 5 secondes
    let autoRotateTimer = setInterval(goToNextSlide, autoRotateInterval);
    
    // Pause de l'auto-rotation au survol
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotateTimer);
    });
    
    // Reprise de l'auto-rotation à la sortie du survol
    carousel.addEventListener('mouseleave', () => {
        autoRotateTimer = setInterval(goToNextSlide, autoRotateInterval);
    });
    */
}

/**
 * Initialise les animations basées sur les classes CSS
 */
function initAnimations() {
    // Animation au défilement pour les éléments avec les classes d'animation
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-bounce');
    
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback pour les navigateurs ne supportant pas IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
    
    // Animation immédiate pour les éléments visibles au chargement
    document.querySelectorAll('.hero .animate-fade-in, .hero .animate-slide-up, .hero .animate-bounce').forEach(element => {
        setTimeout(() => {
            element.classList.add('animated');
        }, 100);
    });
}

/**
 * Fonction utilitaire pour détecter si l'appareil est mobile
 * @returns {boolean} True si l'appareil est mobile
 */
function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Fonction pour détecter si l'utilisateur a une préférence pour les animations réduites
 * @returns {boolean} True si l'utilisateur préfère des animations réduites
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adapte le comportement du carrousel en fonction des préférences d'animations
 */
function adaptAnimationsToUserPreferences() {
    const hasReducedMotionPreference = prefersReducedMotion();
    
    if (hasReducedMotionPreference) {
        // Désactiver les animations non essentielles
        document.documentElement.classList.add('reduced-motion');
    }
}

// Appeler cette fonction pour adapter les animations
adaptAnimationsToUserPreferences();

/**
 * Gestion du formulaire de contact si présent sur la page
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validation simple du formulaire
            const required = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validation spécifique pour l'email
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Envoi en cours...';
                    submitButton.disabled = true;
                    
                    // Simulation d'un délai d'envoi
                    setTimeout(() => {
                        // Ici, vous ajouteriez normalement le code pour envoyer les données du formulaire
                        contactForm.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        
                        // Afficher un message de confirmation
                        const successMessage = document.createElement('div');
                        successMessage.classList.add('form-success-message');
                        successMessage.textContent = 'Votre message a été envoyé avec succès!';
                        contactForm.appendChild(successMessage);
                        
                        setTimeout(() => {
                            successMessage.remove();
                        }, 5000);
                    }, 1500);
                }
            }
        });
    }
}

// Initialiser le formulaire de contact s'il existe
initContactForm();