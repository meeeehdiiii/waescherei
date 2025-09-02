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
    
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if it's a mobile menu link
                if (this.closest('.mobile-menu-list')) {
                    closeMobileMenu();
                }
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
    
    // Mobile menu
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    function closeMobileMenu() {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function toggleMobileMenu() {
        if (mobileToggle) mobileToggle.classList.toggle('active');
        if (mobileMenu) mobileMenu.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu && mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Add event listeners
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    

    
    // Handle mobile menu language buttons
    const langBtnsMobile = document.querySelectorAll('.mobile-language-switcher .lang-btn');
    
    langBtnsMobile.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.id.split('-')[2]; // Extract 'de' or 'en' from 'lang-de-mobile'
            switchLanguage(lang);
            
            // Update mobile menu language buttons
            langBtnsMobile.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update main language buttons too
            const mainLangButtons = document.querySelectorAll('.language-switcher .lang-btn');
            mainLangButtons.forEach(btn => btn.classList.remove('active'));
            const mainBtn = document.getElementById(`lang-${lang}`);
            if (mainBtn) {
                mainBtn.classList.add('active');
            }
        });
    });
});