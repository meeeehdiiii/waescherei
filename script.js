// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-de][data-en]');
    
    // Set default language to German
    let currentLang = 'de';
    
    // Language switcher event listeners
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id.split('-')[1]; // Extract 'de' or 'en' from 'lang-de' or 'lang-en'
            switchLanguage(lang);
        });
    });
    
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        langButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
        
        // Update text content
        elementsWithLang.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.innerHTML = text;
            }
        });
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Update page title
        const titles = {
            de: 'Wäscherei Neuhausen - Professionelle Wäscherei Services',
            en: 'Laundry Neuhausen - Professional Laundry Services'
        };
        document.title = titles[lang];
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Mobile cake menu
    const cakeToggle = document.querySelector('.cake-menu-toggle');
    const cakeMenu = document.querySelector('.cake-menu');
    const cakeOverlay = document.querySelector('.cake-overlay');
    
    function toggleCakeMenu() {
        cakeToggle.classList.toggle('active');
        cakeMenu.classList.toggle('active');
        cakeOverlay.classList.toggle('active');
        document.body.style.overflow = cakeMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeCakeMenu() {
        cakeToggle.classList.remove('active');
        cakeMenu.classList.remove('active');
        cakeOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (cakeToggle) {
        cakeToggle.addEventListener('click', toggleCakeMenu);
    }
    
    if (cakeOverlay) {
        cakeOverlay.addEventListener('click', closeCakeMenu);
    }
    
    // Close cake menu when clicking on a link
    document.querySelectorAll('.cake-slice a').forEach(link => {
        link.addEventListener('click', function() {
            closeCakeMenu();
        });
    });
    
    // Handle cake menu language buttons
    const langBtnsCake = document.querySelectorAll('.language-slice .lang-btn');
    langBtnsCake.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id.split('-')[1]; // Extract 'de' or 'en'
            switchLanguage(lang);
            
            // Update cake menu language buttons
            langBtnsCake.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update main language buttons too
            langButtons.forEach(btn => btn.classList.remove('active'));
            document.getElementById(`lang-${lang}`).classList.add('active');
            
            closeCakeMenu();
        });
    });
});