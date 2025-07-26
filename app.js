// Resume webpage JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeResume();
});

function initializeResume() {
    // Add smooth animations on scroll
    addScrollAnimations();
    
    // Handle contact links
    handleContactLinks();
    
    // Add interactive hover effects
    addInteractiveEffects();
    
    // Handle print functionality
    handlePrintOptimization();
}

// Add scroll-based animations for sections
function addScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Initially hide sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Don't animate header - show immediately
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
}

// Handle contact link interactions
function handleContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-item a');
    
    contactLinks.forEach(link => {
        // Add click tracking and feedback
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle email links
            if (href && href.startsWith('mailto:')) {
                // Add visual feedback for email click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
            
            // Handle external links (LinkedIn, GitHub)
            if (href === '#') {
                e.preventDefault();
                // Show a subtle message that links are placeholder
                showTooltip(this, 'Contact link placeholder');
            }
        });

        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.transform = 'translateY(-1px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add interactive effects to various elements
function addInteractiveEffects() {
    // Skill tags hover effects
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card subtle interactions
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Handle print optimization
function handlePrintOptimization() {
    // Listen for print events
    window.addEventListener('beforeprint', function() {
        // Ensure all sections are visible for printing
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    });

    // Add keyboard shortcut for print (Ctrl+P)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            // Let the default print behavior happen
        }
    });
}

// Utility function to show tooltips
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'var(--color-charcoal-800)';
    tooltip.style.color = 'var(--color-cream-50)';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s ease';
    tooltip.style.pointerEvents = 'none';

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.bottom + 8 + 'px';

    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);

    // Hide tooltip after 2 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                document.body.removeChild(tooltip);
            }
        }, 200);
    }, 2000);
}

// Smooth scrolling utility (if navigation is added later)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Theme detection and handling
function handleThemePreference() {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Theme changed - could add specific handling here if needed
    });
}

// Initialize theme handling
handleThemePreference();

// Export functions for potential external use
window.ResumeApp = {
    smoothScroll,
    showTooltip
};
