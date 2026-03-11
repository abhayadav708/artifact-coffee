// ===================================
// ARTIFACT COFFEE - JAVASCRIPT
// ===================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Sticky Navbar on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Newsletter Form Handling
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing! We\'ll keep you updated on seasonal menus and events.');
        form.reset();
    });
});

// Newsletter Popup (Exit Intent)
const newsletterPopup = document.getElementById('newsletterPopup');
const popupClose = document.getElementById('popupClose');
let popupShown = false;

if (newsletterPopup && popupClose) {
    // Show popup on exit intent
    document.addEventListener('mouseout', (e) => {
        if (!popupShown && e.clientY < 50) {
            setTimeout(() => {
                newsletterPopup.classList.add('active');
                popupShown = true;
            }, 500);
        }
    });

    // Close popup
    popupClose.addEventListener('click', () => {
        newsletterPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    newsletterPopup.addEventListener('click', (e) => {
        if (e.target === newsletterPopup) {
            newsletterPopup.classList.remove('active');
        }
    });

    // Alternative: Show popup after time delay (optional)
    // setTimeout(() => {
    //     if (!popupShown) {
    //         newsletterPopup.classList.add('active');
    //         popupShown = true;
    //     }
    // }, 30000); // 30 seconds
}

// Event Form Modal
const openEventFormBtn = document.getElementById('openEventForm');
const closeEventFormBtn = document.getElementById('closeEventForm');
const eventFormModal = document.getElementById('eventFormModal');

if (openEventFormBtn && eventFormModal) {
    openEventFormBtn.addEventListener('click', () => {
        eventFormModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

if (closeEventFormBtn && eventFormModal) {
    closeEventFormBtn.addEventListener('click', () => {
        eventFormModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

if (eventFormModal) {
    // Close modal when clicking outside
    eventFormModal.addEventListener('click', (e) => {
        if (e.target === eventFormModal) {
            eventFormModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventFormModal.classList.contains('active')) {
            eventFormModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Event Inquiry Form Handling
const eventInquiryForm = document.getElementById('eventInquiryForm');

if (eventInquiryForm) {
    eventInquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(eventInquiryForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send this to your backend
        console.log('Event inquiry:', data);
        
        // Show success message
        alert('Thank you for your inquiry! We\'ll get back to you within 2 business days.');
        
        // Close modal and reset form
        eventFormModal.classList.remove('active');
        document.body.style.overflow = '';
        eventInquiryForm.reset();
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for # only (menu toggle)
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Lazy Loading (for better performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form Validation Enhancement
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.validity.valid) {
                input.style.borderColor = 'var(--color-secondary)';
            } else if (input.value) {
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = 'var(--color-border)';
            }
        });
    });
});

// Auto-hide alerts/notifications (if you add any)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-secondary)' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c🏛️ Artifact Coffee', 'font-size: 20px; font-weight: bold; color: #2C1810;');
console.log('%cBuilt with care for the Baltimore community', 'font-size: 12px; color: #6B8E23;');