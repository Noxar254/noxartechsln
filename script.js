// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Mobile Services Manager
class MobileServicesManager {
    constructor() {
        this.showMoreBtn = document.getElementById('showMoreBtn');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateButtonVisibility();
    }

    bindEvents() {
        if (this.showMoreBtn) {
            this.showMoreBtn.addEventListener('click', () => this.toggleServices());
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateButtonVisibility();
        });
    }

    toggleServices() {
        this.isExpanded = !this.isExpanded;
        
        this.serviceCards.forEach((card, index) => {
            if (index >= 3) {
                if (this.isExpanded) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            }
        });

        this.updateButtonText();
    }

    updateButtonText() {
        if (this.showMoreBtn) {
            const text = this.isExpanded ? 'Show Less Services' : 'Show More Services';
            const icon = this.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
            
            this.showMoreBtn.innerHTML = `${text} <i class="fas ${icon}"></i>`;
        }
    }

    updateButtonVisibility() {
        if (this.showMoreBtn) {
            const isMobile = window.innerWidth <= 768;
            this.showMoreBtn.style.display = isMobile ? 'block' : 'none';
        }
    }
}

// Mobile Projects Manager
class MobileProjectsManager {
    constructor() {
        this.showMoreBtn = document.getElementById('showMoreProjectsBtn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateButtonVisibility();
    }

    bindEvents() {
        if (this.showMoreBtn) {
            this.showMoreBtn.addEventListener('click', () => this.toggleProjects());
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateButtonVisibility();
        });
    }

    toggleProjects() {
        this.isExpanded = !this.isExpanded;
        
        this.projectCards.forEach((card, index) => {
            if (index >= 3) {
                if (this.isExpanded) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            }
        });

        this.updateButtonText();
    }

    updateButtonText() {
        if (this.showMoreBtn) {
            const text = this.isExpanded ? 'Show Less Projects' : 'Show More Projects';
            const icon = this.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
            
            this.showMoreBtn.innerHTML = `${text} <i class="fas ${icon}"></i>`;
        }
    }

    updateButtonVisibility() {
        if (this.showMoreBtn) {
            const isMobile = window.innerWidth <= 768;
            this.showMoreBtn.style.display = isMobile ? 'block' : 'none';
        }
    }
}

// Mobile Navigation Manager
class MobileNavManager {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if it's a dropdown toggle
                if (!link.classList.contains('dropdown-toggle')) {
                    this.closeMobileMenu();
                }
            });
        });

        // Handle dropdown toggles on mobile
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        this.toggleMobileDropdown(dropdown);
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
                this.closeAllMobileDropdowns();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when mobile menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            this.closeAllMobileDropdowns();
        }
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.closeAllMobileDropdowns();
    }

    toggleMobileDropdown(dropdown) {
        // Close other dropdowns
        this.dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active');
            }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
    }

    closeAllMobileDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all navigation links that start with #
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just '#' or empty
                if (href === '#' || href === '') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80; // Account for fixed navbar height
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Optional: Hide/show navbar on scroll (uncomment if desired)
        /*
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
        }
        */

        this.lastScrollTop = scrollTop;
    }
}

// Active Navigation Link Manager
class ActiveNavManager {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.init();
    }

    init() {
        // This will be useful when we add sections to the page
        this.updateActiveLink();
        window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
    }

    updateActiveLink() {
        // Will implement this when we have actual sections
        // For now, it's a placeholder for future functionality
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new MobileNavManager();
    new MobileServicesManager();
    new MobileProjectsManager();
    new SmoothScrollManager();
    new NavbarScrollEffect();
    new ActiveNavManager();

    // Add some interactive feedback
    console.log('🚀 Noxartech Navigation System Initialized');
    
    // Optional: Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Mobile Articles Manager
class MobileArticlesManager {
    constructor() {
        this.viewAllBtn = document.getElementById('viewAllArticlesBtn');
        this.articles = document.querySelectorAll('.article-item');
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateButtonVisibility();
    }

    bindEvents() {
        if (this.viewAllBtn) {
            this.viewAllBtn.addEventListener('click', () => this.toggleArticles());
        }

        // Update button visibility on window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.updateButtonVisibility();
        }, 250));
    }

    toggleArticles() {
        this.isExpanded = !this.isExpanded;
        
        this.articles.forEach((article, index) => {
            if (index >= 2) { // Show/hide articles from index 2 onwards
                if (this.isExpanded) {
                    if (window.innerWidth <= 768) {
                        article.style.display = 'flex';
                    } else {
                        article.style.display = 'flex';
                    }
                } else {
                    article.style.display = 'none';
                }
            }
        });

        // Update button text and icon
        const icon = this.viewAllBtn.querySelector('i');
        if (this.isExpanded) {
            this.viewAllBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
        } else {
            this.viewAllBtn.innerHTML = 'View All Articles <i class="fas fa-chevron-down"></i>';
        }
    }

    updateButtonVisibility() {
        if (window.innerWidth <= 768) {
            if (this.viewAllBtn) {
                this.viewAllBtn.style.display = 'block';
            }
            // Initially hide articles 3 and 4 on mobile
            if (!this.isExpanded) {
                this.articles.forEach((article, index) => {
                    if (index >= 2) {
                        article.style.display = 'none';
                    }
                });
            }
        } else {
            if (this.viewAllBtn) {
                this.viewAllBtn.style.display = 'none';
            }
            // Show all articles on desktop
            this.articles.forEach(article => {
                article.style.display = 'flex';
            });
        }
    }
}

// Initialize Mobile Articles Manager
document.addEventListener('DOMContentLoaded', () => {
    new MobileArticlesManager();
});

// Utility Functions
const Utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        MobileNavManager,
        SmoothScrollManager,
        NavbarScrollEffect,
        ActiveNavManager,
        Utils
    };
}

// Quote Form Manager
class QuoteFormManager {
    constructor() {
        this.form = document.getElementById('quoteForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFormValidation();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    setupFormValidation() {
        // Add required field indicators
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = field.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (!label.textContent.includes('*')) {
                    label.textContent += ' *';
                }
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        // Clear previous errors
        this.clearErrors(field);

        if (isRequired && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        // URL validation
        if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                this.showError(field, 'Please enter a valid URL');
                return false;
            }
        }

        this.showSuccess(field);
        return true;
    }

    showError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Create or update error message
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 5px;';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    showSuccess(field) {
        field.style.borderColor = '#22c55e';
        field.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
    }

    clearErrors(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showNotification('Please correct the errors above', 'error');
            return;
        }

        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Simulate form submission (replace with actual submission logic)
            await this.simulateSubmission(data);

            // Show success message
            this.showNotification('Quote request submitted successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            this.form.reset();
            
            // Clear all field styles
            const fields = this.form.querySelectorAll('input, select, textarea');
            fields.forEach(field => this.clearErrors(field));

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('There was an error submitting your request. Please try again.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async simulateSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Quote request data:', data);
                resolve();
            }, 2000);
        });
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `quote-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#22c55e' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize Quote Form Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteFormManager();
});
