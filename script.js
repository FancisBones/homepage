/Main application namespace
const Portfolio = {
    // Initialize all functionality
    init() {
        this.setupFormValidation();
        this.setupAnimations();
        this.setupNavigation();
    },

    // Form validation handling
    setupFormValidation() {
        const contactForm = document.querySelector('#contact');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                this.handleSuccessfulSubmission(event);
            }
            contactForm.classList.add('was-validated');
        });
    },

    // Handle successful form submission
    handleSuccessfulSubmission(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        this.showNotification('Thank you for your message! We will get back to you soon.');
        event.target.reset();
        event.target.classList.remove('was-validated');
    },

    // Setup animations
    setupAnimations() {
        this.animateHeader();
        this.setupScrollAnimations();
    },

    // Header animation
    animateHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        header.style.opacity = '0';
        requestAnimationFrame(() => {
            header.style.transition = 'opacity 1s ease-out';
            header.style.opacity = '1';
        });
    },

    // Scroll animations
    setupScrollAnimations() {
        const animateOnScroll = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1
        });

        document.querySelectorAll('.card, .profile-image, #intro')
            .forEach(element => observer.observe(element));
    },

    // Navigation handling
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });
    },
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer');
        const currentScrollPosition = window.scrollY;

        // Check scroll direction
        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            footer.style.bottom = '-100%';
        } else {
            // Scrolling up
            footer.style.bottom = '0';
        }

        // Update scroll position
        lastScrollPosition = currentScrollPosition;
    });
    // Utility function for notifications
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Portfolio.init());
