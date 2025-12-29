// ================================================================
// THE RX SPOT - MAIN JAVASCRIPT
// ================================================================

// ================================================================
// 1. MODAL SYSTEM
// ================================================================

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.openButtons = document.querySelectorAll('[data-modal]');
        this.closeButtons = document.querySelectorAll('.modal-close');
        this.overlays = document.querySelectorAll('.modal-overlay');
        this.activeModal = null;

        this.init();
    }

    init() {
        // Open modal buttons
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = button.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Close buttons
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Overlay clicks
        this.overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Close any open modal first
        this.closeModal();

        // Open new modal
        modal.classList.add('active');
        this.activeModal = modal;
        document.body.style.overflow = 'hidden';

        // Focus trap
        const firstFocusable = modal.querySelector('input, button, textarea, select');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    closeModal() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove('active');
        this.activeModal = null;
        document.body.style.overflow = '';
    }
}

// ================================================================
// 2. FAQ ACCORDION
// ================================================================

class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                this.items.forEach(i => i.classList.remove('active'));

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// ================================================================
// 3. STICKY NAVIGATION
// ================================================================

class StickyNav {
    constructor() {
        this.nav = document.getElementById('main-nav');
        this.scrollThreshold = 100;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        });
    }
}

// ================================================================
// 4. SMOOTH SCROLL
// ================================================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's just "#" or opens a modal
                if (href === '#' || link.hasAttribute('data-modal')) {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navHeight = document.getElementById('main-nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ================================================================
// 5. FORM VALIDATION & SUBMISSION
// ================================================================

class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('.modal-form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                // Let FormSubmit handle the submission - don't prevent default
                // Form will submit naturally to FormSubmit.co
            });
        });
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Get checkbox values if present
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length > 0) {
            data.opportunities = Array.from(checkboxes).map(cb => cb.value);
        }

        // Get radio button values for volume matrix if present
        const radioGroups = form.querySelectorAll('input[type="radio"]:checked');
        if (radioGroups.length > 0) {
            const volumeData = {};
            radioGroups.forEach(radio => {
                volumeData[radio.name] = radio.value;
            });
            data.volumeMatrix = volumeData;
        }

        console.log('Form submitted:', data);

        // Show success message (in production, this would be an API call)
        this.showSuccess(form);
    }

    showSuccess(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = '✓ Submitted Successfully!';
        submitButton.style.background = 'var(--color-success)';
        submitButton.disabled = true;

        setTimeout(() => {
            // Close modal
            const modal = form.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Reset form
            form.reset();
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;

            // Show alert
            alert('Thank you for your submission! We\'ll be in touch soon.');
        }, 1500);
    }
}

// ================================================================
// 6. INTERSECTION OBSERVER (Old ScrollAnimations replaced)
// ================================================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.gateway-card, .service-card, .opportunity-card, .timeline-item, .hero-cta-card');
        this.init();
    }

    init() {
        // ... (Maintain existing standard animations for other cards) ...
        // Initialize standard card animations
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });

        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const delay = parent ? Array.from(parent.children).indexOf(entry.target) * 100 : 0;

                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ================================================================
// 7. HERO REVEAL ANIMATIONS (NEW - REQUESTED)
// ================================================================

class RevealAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom-left, .reveal-bottom-right');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // only animate once
                }
            });
        }, {
            threshold: 0.1, // Trigger as soon as 10% is visible
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ================================================================
// 7. FEATURE ITEM CLICK HANDLER
// ================================================================

class FeatureItemClickHandler {
    constructor() {
        this.clickableItems = document.querySelectorAll('.feature-item-clickable');
        this.init();
    }

    init() {
        this.clickableItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Check if it has a data-modal attribute
                const modalId = item.getAttribute('data-modal');
                if (modalId) {
                    // Trigger modal opening
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }

                // Check if it has a data-link attribute
                const link = item.getAttribute('data-link');
                if (link) {
                    // Navigate to external link
                    window.location.href = link;
                }
            });
        });
    }
}

// ================================================================
// 8. MOBILE MENU TOGGLE
// ================================================================

class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;

        if (this.toggle && this.navLinks) {
            this.init();
        }
    }

    init() {
        this.toggle.addEventListener('click', () => {
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                this.open();
            } else {
                this.close();
            }
        });

        // Close menu when clicking nav links
        const links = this.navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
    }

    open() {
        this.navLinks.style.display = 'flex';
        this.navLinks.style.position = 'absolute';
        this.navLinks.style.top = '100%';
        this.navLinks.style.left = '0';
        this.navLinks.style.right = '0';
        this.navLinks.style.flexDirection = 'column';
        this.navLinks.style.background = 'white';
        this.navLinks.style.padding = 'var(--space-6)';
        this.navLinks.style.boxShadow = 'var(--shadow-lg)';
        this.navLinks.style.gap = 'var(--space-4)';

        // Animate toggle button
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    }

    close() {
        this.navLinks.style.display = '';
        this.navLinks.style.position = '';
        this.navLinks.style.top = '';
        this.navLinks.style.left = '';
        this.navLinks.style.right = '';
        this.navLinks.style.flexDirection = '';
        this.navLinks.style.background = '';
        this.navLinks.style.padding = '';
        this.navLinks.style.boxShadow = '';
        this.navLinks.style.gap = '';
        this.isOpen = false;

        // Reset toggle button
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// ================================================================
// 9. INITIALIZATION
// ================================================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ModalManager();
    new FAQAccordion();
    new StickyNav();
    new SmoothScroll();
    new FormHandler();
    new ScrollAnimations();
    new RevealAnimations(); // Init new system
    new FeatureItemClickHandler(); // Enable clickable feature items
    new MobileMenu();

    // Log initialization
    console.log('The Rx Spot - Site initialized successfully');
});

// ================================================================
// 9. UTILITY FUNCTIONS
// ================================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential use elsewhere
window.RxSpotUtils = {
    debounce,
    throttle
};
