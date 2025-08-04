document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Background Slideshow
    const hero = document.getElementById('hero');
    const indicators = document.querySelectorAll('.indicator');
    const circle = document.querySelector('.floating-circle');
    
    const slides = [
        {
            bg: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')",
            icon: 'fas fa-university',
            text: '160+ Years'
        },
        {
            bg: "url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop')",
            icon: 'fas fa-users',
            text: '85K+ Staff'
        },
        {
            bg: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop')",
            icon: 'fas fa-globe',
            text: '60+ Markets'
        }
    ];
    
    let currentSlide = 0;
    
    function changeSlide(index) {
        const slide = slides[index];
        
        // Update background
        hero.style.backgroundImage = slide.bg;
        
        // Update circle content
        const icon = circle.querySelector('i');
        const text = circle.querySelector('.circle-text');
        
        icon.className = slide.icon;
        text.textContent = slide.text;
        
        // Update indicators
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Auto slideshow
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        changeSlide(currentSlide);
    }, 4000);
    
  
  
    changeSlide(0);
    
 
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchCards = document.querySelectorAll('.search-card');
    
  
    
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    const bankingImg = document.querySelector('.banking-img');
    if (bankingImg) {
        observer.observe(bankingImg);
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar.sticky-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
    
  
    document.querySelectorAll('.hover-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('🚀 Standard Chartered website loaded successfully!');
});