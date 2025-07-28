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
            
            // Add metadata
            data.submittedAt = new Date().toISOString();
            data.userAgent = navigator.userAgent;
            data.referrer = document.referrer;

            console.log('Submitting quote request:', data);

            // Submit to Firebase and send emails in parallel for better performance
            const [firebaseResult, emailResult] = await Promise.allSettled([
                window.submitQuoteRequest ? window.submitQuoteRequest(data) : this.fallbackSubmission(data),
                this.tryEmailSubmission(data)
            ]);

            // Check Firebase submission result
            const firebaseSuccess = firebaseResult.status === 'fulfilled' && firebaseResult.value.success;
            const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.success;

            // Log results for debugging
            console.log('Firebase result:', firebaseResult);
            console.log('Email result:', emailResult);

            // Determine overall success
            if (firebaseSuccess) {
                // Send auto-reply to customer
                try {
                    if (window.sendAutoReply) {
                        await window.sendAutoReply(data.email, `${data.firstName} ${data.lastName}`);
                    }
                } catch (autoReplyError) {
                    console.warn('Auto-reply failed:', autoReplyError);
                }

                // Show success message
                let successMessage = 'Quote request submitted successfully! We\'ll get back to you within 24 hours.';
                if (emailSuccess) {
                    successMessage += ' You should also receive a confirmation email shortly.';
                } else {
                    successMessage += ' (Note: Email notification may be delayed)';
                }
                
                this.showNotification(successMessage, 'success');
                
                // Reset form
                this.form.reset();
                
                // Clear all field styles
                const fields = this.form.querySelectorAll('input, select, textarea');
                fields.forEach(field => this.clearErrors(field));

                // Track successful submission (if analytics available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'engagement',
                        event_label: 'quote_request',
                        custom_parameter: data.service
                    });
                }

            } else {
                // Firebase failed, try fallback
                const fallbackResult = await this.fallbackSubmission(data);
                if (fallbackResult.success) {
                    this.showNotification('Quote request submitted via backup system. We\'ll get back to you within 24 hours.', 'success');
                    this.form.reset();
                } else {
                    throw new Error('All submission methods failed');
                }
            }

        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show user-friendly error message
            let errorMessage = 'There was an error submitting your request. ';
            
            if (navigator.onLine === false) {
                errorMessage += 'Please check your internet connection and try again.';
            } else {
                errorMessage += 'Please try again or contact us directly at info@noxartechsln.tech or +254762852457.';
            }
            
            this.showNotification(errorMessage, 'error');
            
            // Track failed submission (if analytics available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_error', {
                    event_category: 'error',
                    event_label: 'quote_request_failed',
                    error_message: error.message
                });
            }
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Try multiple email methods
    async tryEmailSubmission(data) {
        try {
            // Try EmailJS first
            if (window.sendEmailNotification) {
                const result = await window.sendEmailNotification(data);
                if (result.success) {
                    return result;
                }
            }
            
            // If EmailJS fails, try mailto fallback
            if (window.sendMailtoFallback) {
                console.log('EmailJS failed, using mailto fallback');
                return window.sendMailtoFallback(data);
            }
            
            return { success: false, error: 'No email methods available' };
        } catch (error) {
            console.error('Email submission error:', error);
            
            // Last resort: try mailto
            if (window.sendMailtoFallback) {
                console.log('Using mailto as last resort');
                return window.sendMailtoFallback(data);
            }
            
            return { success: false, error: error.message };
        }
    }

    // Fallback submission method using FormSpree or similar service
    async fallbackSubmission(data) {
        try {
            // You can replace this with FormSpree, Netlify Forms, or any other form service
            const fallbackEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your endpoint
            
            const response = await fetch(fallbackEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Fallback submission successful');
                return { success: true };
            } else {
                throw new Error('Fallback submission failed');
            }
        } catch (error) {
            console.error('Fallback submission error:', error);
            return { success: false, error: error.message };
        }
    }

    async simulateSubmission(data) {
        // Keep this as a last resort fallback
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Quote request data (simulated):', data);
                resolve({ success: true });
            }, 1000);
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

// Newsletter Subscription Manager
class NewsletterManager {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time email validation
        const emailInput = this.form.querySelector('#newsletterEmail');
        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
            emailInput.addEventListener('input', () => this.clearErrors(emailInput));
        }
    }

    validateEmail(emailInput) {
        const email = emailInput.value.trim();
        
        // Clear previous errors
        this.clearErrors(emailInput);

        if (!email) {
            this.showFieldError(emailInput, 'Email is required');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError(emailInput, 'Please enter a valid email address');
            return false;
        }

        this.showFieldSuccess(emailInput);
        return true;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Create or update error message
        let errorDiv = field.parentNode.querySelector('.newsletter-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'newsletter-error';
            errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 5px; position: absolute;';
            field.parentNode.style.position = 'relative';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    showFieldSuccess(field) {
        field.style.borderColor = '#22c55e';
        field.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
    }

    clearErrors(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorDiv = field.parentNode.querySelector('.newsletter-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const emailInput = this.form.querySelector('#newsletterEmail');
        const submitBtn = this.form.querySelector('.subscribe-btn');
        
        if (!this.validateEmail(emailInput)) {
            return;
        }

        const email = emailInput.value.trim();
        const originalBtnContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;

        try {
            console.log('Submitting newsletter subscription for:', email);

            // Submit to Firebase
            const result = await this.submitToFirebase(email);

            if (result.success) {
                // Show success message
                this.showSuccessMessage('Thank you for subscribing! You\'ll receive our latest updates.');
                
                // Reset form
                this.form.reset();
                this.clearErrors(emailInput);

                // Track successful subscription (if analytics available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_subscribe', {
                        event_category: 'engagement',
                        event_label: 'newsletter_subscription'
                    });
                }
            } else {
                throw new Error(result.error || 'Subscription failed');
            }

        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showErrorMessage('There was an error subscribing. Please try again.');
            
            // Track failed subscription (if analytics available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_error', {
                    event_category: 'error',
                    event_label: 'newsletter_subscription_failed',
                    error_message: error.message
                });
            }
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }
    }

    async submitToFirebase(email) {
        try {
            if (window.submitNewsletterSubscription) {
                return await window.submitNewsletterSubscription(email);
            } else {
                console.warn('Firebase newsletter function not available');
                return { success: false, error: 'Service not available' };
            }
        } catch (error) {
            console.error('Firebase submission error:', error);
            return { success: false, error: error.message };
        }
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `newsletter-notification ${type}`;
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
            this.hideMessage(notification);
        });

        // Auto hide after 4 seconds
        setTimeout(() => {
            this.hideMessage(notification);
        }, 4000);
    }

    hideMessage(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteFormManager();
    new NewsletterManager();
});
