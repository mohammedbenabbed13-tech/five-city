// Smooth scroll for navigation links
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

// Form submission handler
const activationForm = document.getElementById('activationForm');
const successMessage = document.getElementById('successMessage');

if (activationForm) {
    activationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            username: document.getElementById('username').value,
            age: document.getElementById('age').value,
            lying: document.querySelector('input[name="lying"]:checked').value,
            stealMilitary: document.querySelector('input[name="stealMilitary"]:checked').value,
            ignoreRuleBreaker: document.querySelector('input[name="ignoreRuleBreaker"]:checked').value,
            gunThreaten: document.querySelector('input[name="gunThreaten"]:checked').value,
            stealBank: document.querySelector('input[name="stealBank"]:checked').value,
            robloxUser: document.getElementById('robloxUser').value,
            discordUser: document.getElementById('discordUser').value,
            timestamp: new Date().toLocaleString('ar-SA')
        };

        // Store data in localStorage
        let submissions = JSON.parse(localStorage.getItem('fiveCitySubmissions')) || [];
        submissions.push(formData);
        localStorage.setItem('fiveCitySubmissions', JSON.stringify(submissions));

        // Log to console for debugging
        console.log('Form submitted:', formData);

        // Show success message
        activationForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Reset form after 3 seconds
        setTimeout(() => {
            activationForm.reset();
            activationForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature, .rule-card, .founder-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Navbar active link indicator
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#FF6B35';
        } else {
            link.style.color = '#e0e0e0';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Validate form inputs
const ageInput = document.getElementById('age');
if (ageInput) {
    ageInput.addEventListener('input', (e) => {
        if (e.target.value < 1) {
            e.target.value = 1;
        }
        if (e.target.value > 100) {
            e.target.value = 100;
        }
    });
}

// Add loading state to submit button
const submitBtn = document.querySelector('.btn-submit');
if (submitBtn && activationForm) {
    activationForm.addEventListener('submit', () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري التقديم...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'تقديم الطلب';
        }, 2000);
    });
}

// Mobile menu toggle (if needed in future)
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Detect user's preferred color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
    document.documentElement.style.colorScheme = 'dark';
}

// Log submissions to console (for admin reference)
console.log('%cFIVE CITY - Activation Form', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Five City Server', 'color: #FFB347; font-size: 14px;');
console.log('View submissions: localStorage.getItem("fiveCitySubmissions")');
