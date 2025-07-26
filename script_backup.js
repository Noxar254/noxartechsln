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
   // Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new MobileNavManager();
    new MobileServicesManager();
    new MobileProjectsManager();
    new ProjectsScrollManager();
    new SmoothScrollManager();
    new NavbarScrollEffect();
    new ActiveNavManager();

    // Add some interactive feedback
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

// Projects Scroll Manager
class ProjectsScrollManager {
    constructor() {
        this.scrollContainer = document.querySelector('.projects-scroll-container');
        this.arrow = document.getElementById('scrollRight');
        this.arrowIcon = this.arrow?.querySelector('i');
        this.isAtEnd = false;
        this.init();
    }

    init() {
        if (!this.scrollContainer || !this.arrow) return;
        
        this.bindEvents();
        // Initial check after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.updateArrowState();
        }, 100);
    }

    bindEvents() {
        // Scroll event listener
        this.scrollContainer.addEventListener('scroll', () => {
            this.updateArrowState();
        });

        // Arrow click event
        this.arrow.addEventListener('click', () => {
            this.handleArrowClick();
        });

        // Window resize event
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.updateArrowState();
            }, 100);
        });
    }

    handleArrowClick() {
        if (this.isAtEnd) {
            // Scroll back to beginning
            this.scrollContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to the right
            this.scrollContainer.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        }
    }

    updateArrowState() {
        // Hide arrow on mobile
        if (window.innerWidth <= 768) {
            this.arrow.classList.add('hidden');
            return;
        }

        const scrollLeft = this.scrollContainer.scrollLeft;
        const scrollWidth = this.scrollContainer.scrollWidth;
        const clientWidth = this.scrollContainer.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        // Hide arrow if no scrollable content
        if (maxScroll <= 5) {
            this.arrow.classList.add('hidden');
            return;
        }

        // Show arrow
        this.arrow.classList.remove('hidden');

        // Check if we're at the end
        this.isAtEnd = scrollLeft >= maxScroll - 5;

        // Update arrow icon and behavior
        if (this.isAtEnd) {
            // Show left arrow (go back to start)
            this.arrowIcon.className = 'fas fa-chevron-left';
        } else {
            // Show right arrow (continue scrolling)
            this.arrowIcon.className = 'fas fa-chevron-right';
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new MobileNavManager();
    new MobileServicesManager();
    new MobileProjectsManager();
    new ProjectsScrollManager();
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
