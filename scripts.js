// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('[data-lucide="menu"]');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle between menu and X icon
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.setAttribute('name', 'menu');
        } else {
            menuIcon.setAttribute('name', 'x');
        }
        
        // Recreate icons after change
        lucide.createIcons();
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Here you would normally send the form data to a server
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Here you would normally send the email to a server
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Toggle active class
            this.classList.toggle('active');
            content.classList.toggle('hidden');
            
            // Recreate icons to reflect the new state
            lucide.createIcons();
        });
    });

    // Image carousel functionality
    const screenshots = [
        {
            src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            alt: 'MediScan Dashboard - Main interface showing OCR processing',
            title: 'Main Dashboard'
        },
        {
            src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            alt: 'Document scanning interface with real-time processing',
            title: 'Document Scanning'
        },
        {
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            alt: 'Results display showing structured medical data',
            title: 'Results & Analytics'
        },
        {
            src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            alt: 'Mobile app interface for on-the-go scanning',
            title: 'Mobile Interface'
        },
        {
            src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            alt: 'Export options and data management features',
            title: 'Export & Management'
        }
    ];

    let currentImageIndex = 0;
    const carouselImage = document.getElementById('carousel-image');
    const carouselTitle = document.getElementById('carousel-title');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    // Create thumbnails
    if (thumbnailsContainer) {
        screenshots.forEach((screenshot, index) => {
            const thumbnailBtn = document.createElement('button');
            thumbnailBtn.className = `flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === 0 ? 'border-blue-600' : 'border-gray-300 opacity-70'
            }`;
            thumbnailBtn.innerHTML = `<img src="${screenshot.src}" alt="${screenshot.alt}" class="w-full h-full object-cover">`;
            
            thumbnailBtn.addEventListener('click', () => {
                setActiveImage(index);
            });
            
            thumbnailsContainer.appendChild(thumbnailBtn);
        });
    }
    
    // Navigation functions
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            setActiveImage((currentImageIndex - 1 + screenshots.length) % screenshots.length);
        });
        
        nextBtn.addEventListener('click', () => {
            setActiveImage((currentImageIndex + 1) % screenshots.length);
        });
    }
    
    function setActiveImage(index) {
        // Update current index
        currentImageIndex = index;
        
        // Update main image
        if (carouselImage && carouselTitle) {
            carouselImage.src = screenshots[index].src;
            carouselImage.alt = screenshots[index].alt;
            carouselTitle.textContent = screenshots[index].title;
        }
        
        // Update thumbnails
        if (thumbnailsContainer) {
            const thumbnails = thumbnailsContainer.querySelectorAll('button');
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.remove('border-gray-300', 'opacity-70');
                    thumb.classList.add('border-blue-600');
                } else {
                    thumb.classList.add('border-gray-300', 'opacity-70');
                    thumb.classList.remove('border-blue-600');
                }
            });
        }
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeLightbox = document.getElementById('close-lightbox');
    
    // Open lightbox when main image is clicked
    if (carouselImage && lightbox && lightboxImage && lightboxTitle && lightboxCounter) {
        carouselImage.addEventListener('click', () => {
            lightbox.classList.remove('hidden');
            lightboxImage.src = screenshots[currentImageIndex].src;
            lightboxImage.alt = screenshots[currentImageIndex].alt;
            lightboxTitle.textContent = screenshots[currentImageIndex].title;
            lightboxCounter.textContent = `${currentImageIndex + 1} of ${screenshots.length}`;
        });
    }
    
    // Close lightbox
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
        
        // Also close when clicking outside the image
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.setAttribute('name', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });
});

// 10. Screenshots slider
  $('.screen-carousel').owlCarousel({
    loop: true,
    margin: 0,
    center: true,
    dots: true,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 4
      },
      1920: {
        items: 4
      }
    }
  });