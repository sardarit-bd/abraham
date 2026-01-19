// Cookie Consent Manager for INTEGRAQA
// This file should be included in ALL pages

// Initialize Google Analytics with consent settings
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Default consent state (will be updated based on user choice)
window.dataLayerConsent = {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
};

// Load GA only if consented
function loadGoogleAnalyticsIfConsented() {
    const consent = localStorage.getItem('cookieConsent');
    const analyticsConsent = localStorage.getItem('analyticsConsent');
    
    // If no consent given, don't load GA
    if (!consent) {
        return;
    }
    
    // Load GA only if analytics consent is granted
    if (consent === 'all' || (consent === 'custom' && analyticsConsent === 'true')) {
        // Dynamically load GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-49PM9XF9CQ';
        document.head.appendChild(script);
        
        // Initialize GA with consent settings
        gtag('consent', 'default', {
            'analytics_storage': 'granted',
            'ad_storage': consent === 'all' ? 'granted' : 'denied'
        });
        
        gtag('js', new Date());
        gtag('config', 'G-49PM9XF9CQ', {
            'anonymize_ip': true
        });
        
        // Track consent event
        gtag('event', 'cookie_consent', {
            'event_category': 'engagement',
            'event_label': consent === 'all' ? 'accepted_all' : 'custom_preferences'
        });
    }
}

// Cookie Consent Functions
function showCookieBanner() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.style.display = 'block';
        }
    }
}

function acceptAllCookies() {
    // Set consent for all cookies
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('analyticsConsent', 'true');
    
    // Update GA consent
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
        
        // Track consent event
        gtag('event', 'cookie_consent', {
            'event_category': 'engagement',
            'event_label': 'accepted_all'
        });
    }
    
    // Hide banner and modal
    const banner = document.getElementById('cookieConsent');
    const modal = document.getElementById('cookieModal');
    if (banner) banner.style.display = 'none';
    if (modal) modal.style.display = 'none';
    
    // Now load GA since consent is given
    loadGoogleAnalyticsIfConsented();
}

function rejectCookies() {
    // Set consent to rejected
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('analyticsConsent', 'false');
    
    // Update GA consent to denied
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
        });
        
        // Track rejection event
        gtag('event', 'cookie_consent', {
            'event_category': 'engagement',
            'event_label': 'rejected_all'
        });
    }
    
    // Hide banner
    const banner = document.getElementById('cookieConsent');
    if (banner) {
        banner.style.display = 'none';
    }
}

function manageCookies() {
    // Show cookie management modal
    const modal = document.getElementById('cookieModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    // Load current preferences
    const analyticsConsent = localStorage.getItem('analyticsConsent');
    const analyticsCheckbox = document.getElementById('analyticsCookies');
    
    if (analyticsCheckbox) {
        if (analyticsConsent === 'true') {
            analyticsCheckbox.checked = true;
        } else {
            analyticsCheckbox.checked = false;
        }
    }
}

function closeCookieModal() {
    const modal = document.getElementById('cookieModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveCookiePreferences() {
    const analyticsCheckbox = document.getElementById('analyticsCookies');
    
    // Save preferences
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('analyticsConsent', analyticsCheckbox && analyticsCheckbox.checked ? 'true' : 'false');
    
    // Update GA consent based on preferences
    if (typeof gtag !== 'undefined') {
        if (analyticsCheckbox && analyticsCheckbox.checked) {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        } else {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }
    
    // Hide banner and modal
    const banner = document.getElementById('cookieConsent');
    const modal = document.getElementById('cookieModal');
    if (banner) banner.style.display = 'none';
    if (modal) modal.style.display = 'none';
    
    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cookie_consent', {
            'event_category': 'engagement',
            'event_label': 'custom_preferences',
            'analytics_consent': analyticsCheckbox && analyticsCheckbox.checked ? 'granted' : 'denied'
        });
    }
    
    // Load GA if consented
    loadGoogleAnalyticsIfConsented();
}

// Mobile menu functions (keep these for compatibility)
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function toggleServicesMenu() {
    const submenu = document.getElementById('servicesSubmenu');
    const arrow = document.getElementById('servicesArrow');
    if (submenu && arrow) {
        submenu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // 1. Check existing consent and load GA if consented
    loadGoogleAnalyticsIfConsented();
    
    // 2. Show cookie banner if no consent has been given
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            showCookieBanner();
        }, 1000);
    }
    
    // 3. Mobile menu click outside handler
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('mobileMenu');
        const menuButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
        
        if (menu && !menu.contains(event.target) && !menuButton && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    });
    
    // 4. Close mobile menu when clicking a link
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                this.classList.add('hidden');
            }
        });
    }
});

// Make functions globally available
window.acceptAllCookies = acceptAllCookies;
window.rejectCookies = rejectCookies;
window.manageCookies = manageCookies;
window.closeCookieModal = closeCookieModal;
window.saveCookiePreferences = saveCookiePreferences;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleServicesMenu = toggleServicesMenu;