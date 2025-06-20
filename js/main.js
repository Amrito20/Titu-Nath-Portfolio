// Enhanced Portfolio JavaScript with Anime.js v4 and Advanced Features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page loader
    initializePageLoader();
    
    // Initialize theme management
    initializeTheme();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize Vanta background
    initializeVantaBackground();
    
    // Initialize animations (wait for Anime.js to load)
    setTimeout(initializeAnimations, 100);
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Initialize interactive elements
    initializeInteractiveElements();
});

// Page Loader Management
function initializePageLoader() {
    const loader = document.getElementById('pageLoader');
    
    // Hide loader after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                
                // Trigger entrance animations after loader is hidden
                setTimeout(() => {
                    triggerEntranceAnimations();
                }, 300);
            }
        }, 1000); // Show loader for at least 1 second
    });
}

// Enhanced Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update Vanta background for theme
            updateVantaTheme(newTheme);
            
            // Animate theme toggle with Anime.js v4
            if (window.animeJS) {
                window.animeJS.animate(themeToggle, {
                    scale: [1, 0.8, 1.2, 1],
                    rotate: [0, 180, 360],
                    duration: 600,
                    ease: 'spring(1, 80, 10, 0)'
                });
                
                // Animate theme transition
                window.animeJS.animate('body', {
                    filter: ['brightness(1)', 'brightness(0.8)', 'brightness(1)'],
                    duration: 400,
                    ease: 'easeOutQuad'
                });
            }
        });
    }
}

// Enhanced Navigation Management
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate menu items with Anime.js v4
            if (navLinks.classList.contains('active') && window.animeJS) {
                window.animeJS.animate('.nav-item', {
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: window.animeJS.stagger(100),
                    duration: 600,
                    ease: 'spring(1, 80, 10, 0)'
                });
            }
        });

        // Close menu when link is clicked
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Add active class to current page
    const currentLocation = location.pathname;
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentLocation.substring(currentLocation.lastIndexOf('/') + 1)) {
            link.classList.add('active');
        }
    });

    // Enhanced hover animations for nav items
    if (window.animeJS) {
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) { // Only on desktop
                    window.animeJS.animate(item, {
                        scale: 1.1,
                    duration: 300,
                        ease: 'easeOutQuad'
                });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) { // Only on desktop
                    window.animeJS.animate(item, {
                    scale: 1,
                    duration: 300,
                        ease: 'easeOutQuad'
                });
                }
            });
        });
    }
}

// Enhanced Vanta Background Management
let vantaEffect = null;
let currentVantaEffect = 2; // Start with BIRDS effect (index 2)
const vantaEffects = ['WAVES', 'NET', 'BIRDS', 'FOG', 'CLOUDS', 'TRUNK', 'DOTS', 'RINGS', 'CELLS'];

function initializeVantaBackground() {
    const vantaContainer = document.getElementById('vanta-bg');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (vantaContainer && typeof VANTA !== 'undefined') {
        // Start with BIRDS effect as default
        createVantaEffect(2, currentTheme);
        
        // Add loaded class for fade-in effect
        setTimeout(() => {
            vantaContainer.classList.add('loaded');
        }, 500);
        
        // Background toggle functionality
        const bgToggle = document.getElementById('bgToggle');
        if (bgToggle) {
            bgToggle.addEventListener('click', () => {
                // Add clicked class for CSS animation
                bgToggle.classList.add('clicked');
                setTimeout(() => {
                    bgToggle.classList.remove('clicked');
                }, 600);
                
                cycleVantaEffect();
                
                // Animate the toggle button
                if (window.animeJS) {
                    window.animeJS.animate(bgToggle, {
                        scale: [1, 0.9, 1.1, 1],
                        rotate: [0, 360, 0],
                        duration: 600,
                        ease: 'spring(1, 80, 10, 0)'
                    });
                }
            });
        }
    }
}

function createVantaEffect(effectIndex, theme) {
    const vantaContainer = document.getElementById('vanta-bg');
    const isMobile = window.innerWidth <= 768;
    const effectName = vantaEffects[effectIndex];
    
    // Destroy existing effect
    if (vantaEffect) {
        try {
            vantaEffect.destroy();
        } catch (e) {
            console.log('Effect destruction handled:', e);
        }
        vantaEffect = null;
    }
    
    // Skip heavy effects on mobile for better performance
    const mobileSkipEffects = ['TRUNK', 'CELLS'];
    if (isMobile && mobileSkipEffects.includes(effectName)) {
        // Use WAVES as fallback for mobile
        return createVantaEffect(0, theme);
    }
    
    try {
        const baseConfig = {
            el: vantaContainer,
            mouseControls: !isMobile,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: isMobile ? 0.8 : 1.00,
            scaleMobile: 0.6
        };
        
        // Add timeout to prevent hanging
        const effectTimeout = setTimeout(() => {
            if (!vantaEffect) {
                console.log('Effect loading timeout, falling back to WAVES');
                createVantaEffect(0, theme);
            }
        }, 5000);
        
        switch (effectName) {
            case 'WAVES':
                vantaEffect = VANTA.WAVES({
                    ...baseConfig,
                    color: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                    shininess: theme === 'dark' ? 30 : 50,
                    waveHeight: theme === 'dark' ? 15 : 20,
                    waveSpeed: 0.5,
                    zoom: 0.8
                });
                break;
            case 'NET':
                vantaEffect = VANTA.NET({
                    ...baseConfig,
                    color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                    backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                    points: isMobile ? 6 : 8,
                    maxDistance: isMobile ? 20 : 25,
                    spacing: isMobile ? 15 : 20
                });
                break;
            case 'BIRDS':
                if (VANTA.BIRDS) {
                    vantaEffect = VANTA.BIRDS({
                        ...baseConfig,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        color1: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c,
                        birdSize: isMobile ? 0.8 : 1.0,
                        speedLimit: isMobile ? 3 : 5,
                        separation: isMobile ? 15 : 20
                    });
                }
                break;
            case 'FOG':
                if (VANTA.FOG) {
                    vantaEffect = VANTA.FOG({
                        ...baseConfig,
                        highlightColor: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        midtoneColor: theme === 'dark' ? 0x1a1a1a : 0xf8f9fa,
                        lowlightColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        baseColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        speed: isMobile ? 0.8 : 1.2
                    });
                }
                break;
            case 'CLOUDS':
                if (VANTA.CLOUDS) {
                    vantaEffect = VANTA.CLOUDS({
                        ...baseConfig,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        cloudColor: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        skyColor: theme === 'dark' ? 0x1a1a1a : 0xf8f9fa,
                        sunColor: theme === 'dark' ? 0xff6b6b : 0xe74c3c,
                        speed: isMobile ? 0.6 : 1.0
                    });
                }
                break;
            case 'TRUNK':
                if (VANTA.TRUNK) {
                    vantaEffect = VANTA.TRUNK({
                        ...baseConfig,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        spacing: isMobile ? 8 : 12,
                        chaos: isMobile ? 1.5 : 2.0
                    });
                }
                break;
            case 'DOTS':
                if (VANTA.DOTS) {
                    vantaEffect = VANTA.DOTS({
                        ...baseConfig,
                        color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        size: isMobile ? 3.0 : 4.0,
                        spacing: isMobile ? 25 : 30
                    });
                }
                break;
            case 'RINGS':
                if (VANTA.RINGS) {
                    vantaEffect = VANTA.RINGS({
                        ...baseConfig,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        scale: isMobile ? 0.8 : 1.0,
                        scaleMobile: 0.6
                    });
                }
                break;
            case 'CELLS':
                if (VANTA.CELLS) {
                    vantaEffect = VANTA.CELLS({
                        ...baseConfig,
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        color1: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c,
                        size: isMobile ? 1.2 : 1.5,
                        speed: isMobile ? 0.8 : 1.0
                    });
                }
                break;
        }
        
        // Clear timeout if effect loaded successfully
        if (vantaEffect) {
            clearTimeout(effectTimeout);
        }
        
    } catch (error) {
        console.log('Vanta effect initialization failed:', error);
        // Fallback to WAVES if other effects fail
        if (effectName !== 'WAVES') {
            createVantaEffect(0, theme);
        }
    }
}

function cycleVantaEffect() {
    currentVantaEffect = (currentVantaEffect + 1) % vantaEffects.length;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Add transition effect
    const vantaContainer = document.getElementById('vanta-bg');
    if (vantaContainer && window.animeJS) {
        window.animeJS.animate(vantaContainer, {
            opacity: [1, 0.3, 1],
            duration: 800,
            ease: 'easeInOutQuad',
            complete: () => {
                createVantaEffect(currentVantaEffect, currentTheme);
            }
        });
    } else {
        createVantaEffect(currentVantaEffect, currentTheme);
    }
}

function updateVantaTheme(theme) {
    if (vantaEffect) {
        const isMobile = window.innerWidth <= 768;
        const effectName = vantaEffects[currentVantaEffect];
        
        try {
            switch (effectName) {
                case 'WAVES':
                vantaEffect.setOptions({
                    color: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                    shininess: theme === 'dark' ? 30 : 50,
                    waveHeight: theme === 'dark' ? 15 : 20
                });
                    break;
                case 'NET':
                vantaEffect.setOptions({
                    color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                    backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff
                });
                    break;
                case 'BIRDS':
                    vantaEffect.setOptions({
                        backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        color1: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c
                    });
                    break;
                case 'FOG':
                    vantaEffect.setOptions({
                        highlightColor: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                        midtoneColor: theme === 'dark' ? 0x1a1a1a : 0xf8f9fa,
                        lowlightColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                        baseColor: theme === 'dark' ? 0x0a0a0a : 0xffffff
                    });
                    break;
                case 'CLOUDS':
                    if (vantaEffect.setOptions) {
                        vantaEffect.setOptions({
                            backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                            cloudColor: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                            skyColor: theme === 'dark' ? 0x1a1a1a : 0xf8f9fa,
                            sunColor: theme === 'dark' ? 0xff6b6b : 0xe74c3c
                        });
                    }
                    break;
                case 'TRUNK':
                    if (vantaEffect.setOptions) {
                        vantaEffect.setOptions({
                            backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                            color: theme === 'dark' ? 0x00d4ff : 0x0099cc
                        });
                    }
                    break;
                case 'DOTS':
                    if (vantaEffect.setOptions) {
                        vantaEffect.setOptions({
                            color: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                            color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c,
                            backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff
                        });
                    }
                    break;
                case 'RINGS':
                    if (vantaEffect.setOptions) {
                        vantaEffect.setOptions({
                            backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                            color: theme === 'dark' ? 0x00d4ff : 0x0099cc
                        });
                    }
                    break;
                case 'CELLS':
                    if (vantaEffect.setOptions) {
                        vantaEffect.setOptions({
                            backgroundColor: theme === 'dark' ? 0x0a0a0a : 0xffffff,
                            color1: theme === 'dark' ? 0x00d4ff : 0x0099cc,
                            color2: theme === 'dark' ? 0xff6b6b : 0xe74c3c
                        });
                    }
                    break;
            }
        } catch (error) {
            console.log('Vanta theme update failed:', error);
        }
    }
}

// Enhanced Animations with Anime.js v4
function initializeAnimations() {
    if (!window.animeJS) return;

    // Animate floating elements
    animateFloatingElements();
    
    // Animate profile image
    animateProfileImage();
    
    // Add hover animations to buttons
    addButtonHoverAnimations();
    
    // Add hover animations to social links
    addSocialLinkAnimations();
}

function triggerEntranceAnimations() {
    if (!window.animeJS) return;

    // Animate navigation
    window.animeJS.animate('.navbar', {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'spring(1, 80, 10, 0)'
    });

    // Animate logo characters
    window.animeJS.animate('.logo-char', {
        translateY: [-30, 0],
        opacity: [0, 1],
        rotate: [90, 0],
        delay: window.animeJS.stagger(100, {from: 'first'}),
        duration: 600,
        ease: 'spring(1, 80, 10, 0)'
    });

    // Animate hero content
    window.animeJS.animate('.hero-greeting .greeting-word', {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: window.animeJS.stagger(200),
        duration: 800,
        ease: 'spring(1, 80, 10, 0)'
    });

    window.animeJS.animate('.name-char', {
        translateY: [100, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: window.animeJS.stagger(100, {from: 'center'}),
        duration: 1000,
        ease: 'spring(1, 80, 10, 0)'
    });

    // Animate CTA buttons
    setTimeout(() => {
        window.animeJS.animate('.cta-btn', {
            translateY: [50, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: window.animeJS.stagger(200),
            duration: 800,
            ease: 'spring(1, 80, 10, 0)'
        });
    }, 800);

    // Animate hero image
    setTimeout(() => {
        window.animeJS.animate('.image-container', {
            scale: [0.5, 1],
            opacity: [0, 1],
            rotate: [180, 0],
            duration: 1200,
            ease: 'spring(1, 80, 10, 0)'
        });
    }, 600);

        // Animate floating elements
    setTimeout(() => {
        window.animeJS.animate('.floating-element', {
            scale: [0, 1],
            opacity: [0, 1],
            delay: window.animeJS.stagger(200, {from: 'random'}),
            duration: 800,
            ease: 'spring(1, 80, 10, 0)'
        });
    }, 1000);
}

function animateFloatingElements() {
    if (!window.animeJS) return;

    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Continuous floating animation
        window.animeJS.animate(element, {
            translateY: [-20, 20],
            rotate: [-10, 10],
            duration: 3000 + (index * 200),
            direction: 'alternate',
            loop: true,
            ease: 'easeInOutSine'
        });

        // Hover interaction
        element.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                window.animeJS.animate(element, {
                    scale: 1.3,
                    rotate: 360,
                    duration: 400,
                    ease: 'spring(1, 80, 10, 0)'
                    });
                }
            });
            
        element.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                window.animeJS.animate(element, {
                    scale: 1,
                    duration: 400,
                    ease: 'spring(1, 80, 10, 0)'
                    });
                }
            });
        });
}

function animateProfileImage() {
    if (!window.animeJS) return;

        const profileImg = document.querySelector('.profile-img');
    
        if (profileImg) {
        // Continuous subtle floating
        window.animeJS.animate(profileImg, {
            translateY: [-10, 10],
            duration: 4000,
            direction: 'alternate',
            loop: true,
            ease: 'easeInOutSine'
        });

        // Hover effect
            profileImg.addEventListener('mouseenter', () => {
            window.animeJS.animate(profileImg, {
                scale: 1.05,
                rotate: 5,
                duration: 400,
                ease: 'spring(1, 80, 10, 0)'
                });
            });
            
            profileImg.addEventListener('mouseleave', () => {
            window.animeJS.animate(profileImg, {
                scale: 1,
                rotate: 0,
                duration: 400,
                ease: 'spring(1, 80, 10, 0)'
                });
            });
        }
    }

function addButtonHoverAnimations() {
    if (!window.animeJS) return;

    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            window.animeJS.animate(button, {
                scale: 1.05,
                translateY: -3,
                duration: 300,
                ease: 'spring(1, 80, 10, 0)'
            });
        });

        button.addEventListener('mouseleave', () => {
            window.animeJS.animate(button, {
                scale: 1,
                translateY: 0,
                duration: 300,
                ease: 'spring(1, 80, 10, 0)'
            });
        });
    });
}

function addSocialLinkAnimations() {
    if (!window.animeJS) return;

    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            window.animeJS.animate(link, {
                scale: 1.2,
                translateY: -5,
                rotate: 360,
                duration: 400,
                ease: 'spring(1, 80, 10, 0)'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            window.animeJS.animate(link, {
                scale: 1,
                translateY: 0,
                rotate: 0,
                duration: 400,
                ease: 'spring(1, 80, 10, 0)'
            });
        });
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    const texts = [
        'MSc./PhD. Aspirant',
        'Mechanical Engineer',
        'Research Enthusiast',
        'Innovation Leader',
        'Team Player'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting) {
            // Typing
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                // Pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, 2000);
                return;
            }
        } else {
            // Deleting
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
            }
        }
        
        // Typing speed
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeText, speed);
    }
    
    if (typingElement) {
        setTimeout(typeText, 1000); // Start after 1 second
    }
}

// Enhanced Scroll Effects
function initializeScrollEffects() {
    // Scroll progress indicator
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        if (scrollProgress) {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
        }
        
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        const scrollY = window.scrollY;
        
        floatingElements.forEach((element) => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrollY * speed * 0.1);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.animeJS) {
                const element = entry.target;
                
                if (element.classList.contains('social-link')) {
                    window.animeJS.animate(element, {
                        scale: [0.5, 1],
                        opacity: [0, 1],
                        duration: 600,
                        ease: 'spring(1, 80, 10, 0)'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.social-link').forEach(el => observer.observe(el));
}

// Interactive Elements
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .theme-toggle, .bg-toggle');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS animation for ripple
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced name character interactions
    const nameChars = document.querySelectorAll('.name-char');
    nameChars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            if (window.animeJS && window.innerWidth > 768) {
                window.animeJS.animate(char, {
                    translateY: -20,
                    scale: 1.3,
                    rotate: 15,
                    duration: 300,
                    ease: 'spring(1, 80, 10, 0)'
                });
            }
        });

        char.addEventListener('mouseleave', () => {
            if (window.animeJS && window.innerWidth > 768) {
                window.animeJS.animate(char, {
                    translateY: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 300,
                    ease: 'spring(1, 80, 10, 0)'
                });
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    // Update Vanta effect for new screen size
    if (vantaEffect) {
        setTimeout(() => {
        vantaEffect.resize();
        }, 100);
    }
    
    // Update floating elements for mobile
    const floatingElements = document.querySelectorAll('.floating-element');
    if (window.innerWidth <= 768) {
        floatingElements.forEach(el => {
            el.style.display = 'none';
        });
    } else {
        floatingElements.forEach(el => {
            el.style.display = 'flex';
        });
    }
});

// Performance optimizations
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (vantaEffect) {
            vantaEffect.setOptions({ paused: true });
        }
    } else {
        // Resume animations when tab becomes visible
    if (vantaEffect) {
            vantaEffect.setOptions({ paused: false });
        }
    }
});

// Error handling for missing libraries
window.addEventListener('error', (e) => {
    if (e.message.includes('VANTA') || e.message.includes('anime')) {
        console.warn('Animation library failed to load, falling back to CSS animations');
    }
});

// Fallback for older browsers
if (!window.IntersectionObserver) {
    // Polyfill or fallback behavior
    console.warn('IntersectionObserver not supported, scroll animations disabled');
}
