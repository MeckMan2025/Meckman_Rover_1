// Meckman Rover_1 Homepage JavaScript

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Observe phase items in roadmap
    const phases = document.querySelectorAll('.phase');
    phases.forEach(phase => {
        observer.observe(phase);
    });

    // Add scroll event for hero section parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroAccent = document.querySelector('.hero-accent');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        if (heroAccent && scrolled < window.innerHeight) {
            heroAccent.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Add hover effects for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Progressive image loading
    const images = document.querySelectorAll('.build-image:not(.current-state) img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Add click handlers for roadmap phases
    phases.forEach(phase => {
        phase.addEventListener('click', function() {
            // Add subtle interaction feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Video lazy loading and controls
    const video = document.querySelector('video');
    if (video) {
        // Add play/pause on click
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });

        // Intersection observer for video
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Optionally preload video when in viewport
                    entry.target.load();
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(video);
    }
});

// Add animation classes to CSS when elements come into view
const style = document.createElement('style');
style.textContent = `
    section:not(.hero), .feature-card, .phase {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    section.animate-in, .feature-card.animate-in, .phase.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card {
        transition-delay: 0.1s;
    }
    
    .feature-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    .feature-card:nth-child(4) {
        transition-delay: 0.4s;
    }
    
    .feature-card:nth-child(5) {
        transition-delay: 0.5s;
    }
    
    .build-image:not(.current-state) img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .build-image:not(.current-state) img.loaded {
        opacity: 1;
    }
    
    .phase {
        transition-delay: calc(var(--phase-index, 0) * 0.1s);
    }
    
    @media (prefers-reduced-motion: reduce) {
        section, .feature-card, .phase {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

document.head.appendChild(style);

// Add phase index CSS custom properties for staggered animation
document.addEventListener('DOMContentLoaded', function() {
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        phase.style.setProperty('--phase-index', index);
    });
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add subtle cursor effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .phase');
    
    interactiveElements.forEach(element => {
        element.style.cursor = 'pointer';
    });

    // Roadmap pulse animation
    const roadmapSection = document.querySelector('#roadmap');
    const timeline = document.querySelector('.timeline');
    const pulse = document.querySelector('.timeline .pulse');

    if (roadmapSection && timeline && pulse) {
        window.addEventListener('scroll', () => {
            const sectionRect = roadmapSection.getBoundingClientRect();
            const timelineHeight = timeline.offsetHeight;

            // Check if the roadmap section is in the viewport
            if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                // Calculate scroll progress within the section.
                const progress = (window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height);
                const clampedProgress = Math.max(0, Math.min(1, progress));
                
                // Calculate the new top position for the pulse
                const newTop = clampedProgress * (timelineHeight - 30); // 30 is pulse height
                
                pulse.style.top = `${newTop}px`;
                pulse.style.opacity = '0.7';
            } else {
                pulse.style.opacity = '0';
            }
        }, { passive: true });
    }

    // Meckman.org link offline fallback
    const meckmanLink = document.getElementById('meckman-link');
    if (meckmanLink) {
        meckmanLink.addEventListener('click', function(event) {
            if (!navigator.onLine) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});