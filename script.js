//animation
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

//  Background Slideshow
const heroBackgrounds = [
    {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        title: 'Global Banking Excellence',
        subtitle: 'Connecting markets worldwide with innovative financial solutions',
        icon: 'fas fa-globe-americas'
    },
    {
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        title: 'Digital Innovation',
        subtitle: 'Leading the future of banking with cutting-edge technology',
        icon: 'fas fa-rocket'
    },
    {
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        title: 'Sustainable Finance',
        subtitle: 'Building a better tomorrow through responsible banking',
        icon: 'fas fa-leaf'
    }
];

let currentSlide = 0;
const heroSection = document.getElementById('heroSection');
const heroImageContent = document.getElementById('heroImageContent');
const indicators = document.querySelectorAll('.indicator');

// Function to update my background 
function updateHeroSlide(index) {
    const slide = heroBackgrounds[index];
    
    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.image}')`;
    
    
    heroImageContent.style.opacity = '0';
    heroImageContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroImageContent.innerHTML = `
            <div class="hero-slide-content" data-aos="fade-up" data-aos-duration="800">
                <div class="mb-4">
                    <i class="${slide.icon}" style="font-size: 4rem; color: #00c851; text-shadow: 0 0 20px rgba(0,200,81,0.5);"></i>
                </div>
                <h3 class="fw-bold mb-3" style="font-size: 2rem;">${slide.title}</h3>
                <p class="lead" style="font-size: 1.1rem; opacity: 0.9;">${slide.subtitle}</p>
            </div>
        `;
        
        heroImageContent.style.opacity = '1';
        heroImageContent.style.transform = 'translateY(0)';
        heroImageContent.style.transition = 'all 0.8s ease-out';
    }, 300);
    
 
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.style.background = 'white';
            indicator.style.transform = 'scale(1.2)';
            indicator.classList.add('active');
        } else {
            indicator.style.background = 'rgba(255,255,255,0.5)';
            indicator.style.transform = 'scale(1)';
            indicator.classList.remove('active');
        }
    });
    
    currentSlide = index;
}


updateHeroSlide(0);

//auto slides
setInterval(() => {
    currentSlide = (currentSlide + 1) % heroBackgrounds.length;
    updateHeroSlide(currentSlide);
}, 7000);


indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        updateHeroSlide(index);
    });
});




// Smooth scrolling removed - now uses default browser behavior


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.sticky-top');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.transition = 'all 0.3s ease';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-card h4');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString() + '+';
        }, 20);
    });
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    });
});

const statsSection = document.querySelector('.stat-card');
if (statsSection) {
    observer.observe(statsSection);
}


 