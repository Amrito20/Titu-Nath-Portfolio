import os
import re

# Enhanced header structure for each page
def get_enhanced_header(page_name, active_nav):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page_name} - Titu Nath</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Three.js for Vanta backgrounds -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <!-- Vanta.js effects -->
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js"></script>'''

def get_enhanced_body_start():
    return '''</head>
<body>
    <!-- Animated background container -->
    <div id="vanta-bg" class="vanta-background"></div>
    
    <!-- Page loader -->
    <div class="page-loader" id="pageLoader">
        <div class="loader-content">
            <div class="loader-circle"></div>
            <div class="loader-text">Loading...</div>
        </div>
    </div>

    <!-- Scroll progress indicator -->
    <div class="scroll-progress" id="scrollProgress"></div>
    
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <a href="index.html" class="logo-text">
                        <span class="logo-char">P</span>
                        <span class="logo-char">o</span>
                        <span class="logo-char">r</span>
                        <span class="logo-char">t</span>
                        <span class="logo-char">f</span>
                        <span class="logo-char">o</span>
                        <span class="logo-char">l</span>
                        <span class="logo-char">i</span>
                        <span class="logo-char">o</span>
                    </a>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-item" data-text="Home">Home</a></li>
                    <li><a href="about.html" class="nav-item" data-text="About">About</a></li>
                    <li><a href="research.html" class="nav-item" data-text="Research">Research</a></li>
                    <li><a href="projects.html" class="nav-item" data-text="Projects">Projects</a></li>
                    <li><a href="skills.html" class="nav-item" data-text="Skills">Skills</a></li>
                    <li><a href="achievements.html" class="nav-item" data-text="Achievements">Achievements</a></li>
                    <li><a href="activities.html" class="nav-item" data-text="Activities">Activities</a></li>
                    <li><a href="contact.html" class="nav-item" data-text="Contact">Contact</a></li>
                </ul>
                <div class="nav-controls">
                    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                        <div class="theme-icon">
                            <i class="fas fa-sun"></i>
                            <i class="fas fa-moon"></i>
                        </div>
                    </button>
                    <button class="bg-toggle" id="bgToggle" aria-label="Change background effect">
                        <i class="fas fa-magic"></i>
                    </button>
                    <div class="hamburger" id="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        </div>
    </header>'''

def get_enhanced_footer():
    return '''    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Connect</h3>
                    <div class="social-links">
                        <a href="https://github.com/" target="_blank" class="social-link" data-tooltip="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/titu-nath" target="_blank" class="social-link" data-tooltip="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.researchgate.net/profile/Titu-Nath?ev=hdr_xprf" target="_blank" class="social-link" data-tooltip="ResearchGate">
                            <i class="fab fa-researchgate"></i>
                        </a>
                        <a href="mailto:contact@titunath.com" class="social-link" data-tooltip="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <div class="footer-links">
                        <a href="index.html">Home</a>
                        <a href="about.html">About</a>
                        <a href="research.html">Research</a>
                        <a href="projects.html">Projects</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <p>Let's connect and create something amazing together!</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Titu Nath. All Rights Reserved. | Crafted with <i class="fas fa-heart"></i></p>
            </div>
        </div>
    </footer>

    <!-- Anime.js -->
    <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>'''

print("Template structures created for page updates") 