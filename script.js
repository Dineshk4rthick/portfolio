// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeForm();
    initializeTactileEffects();
    initializeParallax();
    initializeSlideshow();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll effects for navbar and elements
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
        lastScrollTop = scrollTop;

        // Parallax effect for background shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`;
        });

        // Fade in elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.glass, .tactile');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .glass, .tactile {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero .glass {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Staggered animation for skill tags and project cards
    setTimeout(() => {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

// Enhanced tactile effects
function initializeTactileEffects() {
    const tactileElements = document.querySelectorAll('.tactile');
    
    tactileElements.forEach(element => {
        // Mouse enter effect
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.2)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Mouse move effect for 3D tilt
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        // Mouse leave effect
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Parallax effects
function initializeParallax() {
    const floatingTech = document.querySelectorAll('.floating-tech');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        floatingTech.forEach((tech, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = scrolled * speed;
            tech.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Contact form functionality
function initializeForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add focus effects to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content glass">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
        }
        
        .notification.success .notification-content {
            border-left: 4px solid #4ecdc4;
        }
        
        .notification.error .notification-content {
            border-left: 4px solid #ff6b6b;
        }
        
        .notification-message {
            flex: 1;
            color: #ffffff;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = notificationStyles;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth reveal animations for project cards
function initializeProjectAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Initialize project animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectAnimations);

// Performance optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        updateActiveNavLink();
        animateOnScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Lazy load images when implemented
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize performance optimizations
optimizePerformance();

// Enhanced Slideshow functionality
let slideIndex = 1;
let slideIndex2 = 1; // For second slideshow

function initializeSlideshow() {
    console.log('Initializing enhanced slideshow...');
    showSlide(slideIndex);
    showSlide2(slideIndex2); // Initialize second slideshow
    
    // Auto-advance slides every 4 seconds
    setInterval(function() {
        plusSlides(1);
    }, 4000);
    
    // Auto-advance second slideshow every 4.5 seconds (slightly offset)
    setInterval(function() {
        plusSlides2(1);
    }, 4500);
    
    console.log('Slideshow initialized with auto-advance');
}

function plusSlides(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

// Functions for second slideshow
function plusSlides2(n) {
    showSlide2(slideIndex2 += n);
}

function currentSlide2(n) {
    showSlide2(slideIndex2 = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slideshow-container:not(#slideshow-2) .slide-item');
    const dots = document.querySelectorAll('.slideshow-container:not(#slideshow-2) .dot');
    
    if (slides.length === 0) {
        console.log('No slides found for first slideshow');
        return;
    }
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
    
    console.log('Showing slide:', slideIndex);
}

function showSlide2(n) {
    const slides = document.querySelectorAll('#slideshow-2 .slide-item');
    const dots = document.querySelectorAll('#slideshow-2 .dot');
    
    if (slides.length === 0) {
        console.log('No slides found for second slideshow');
        return;
    }
    
    if (n > slides.length) { slideIndex2 = 1; }
    if (n < 1) { slideIndex2 = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex2 - 1]) {
        slides[slideIndex2 - 1].classList.add('active');
    }
    
    if (dots[slideIndex2 - 1]) {
        dots[slideIndex2 - 1].classList.add('active');
    }
    
    console.log('Showing slide 2:', slideIndex2);
}
