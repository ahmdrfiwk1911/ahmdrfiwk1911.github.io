document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mouse Glow Effect Tracker
    const mouseGlow = document.getElementById('mouseGlow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            // Update glow position smoothly
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            
            // Swap Lucide Icon
            if (isOpen) {
                menuToggle.innerHTML = '<i data-lucide="x"></i>';
            } else {
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // 5. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    const words = [
        'Full-Stack Developer',
        'Frontend & Backend Developer',
        'Python & JavaScript Specialist',
        'HTML & CSS Expert'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 150;

    function typeEffect() {
        if (!typewriter) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            delay = 50; // Deleting is faster
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            delay = 120; // Normal typing speed
        }

        // If word is complete, pause before deleting
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500; // Pause before starting next word
        }

        setTimeout(typeEffect, delay);
    }
    
    // Start typewriter
    typeEffect();

    // 6. Active Nav Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for navbar
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 7. Project Filters Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    // Show matching card
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    // Hide non-matching card
                    card.classList.add('hide');
                }
            });
        });
    });

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';
            
            // Simulate API request delay
            setTimeout(() => {
                formStatus.textContent = 'Your message has been sent successfully! Thank you.';
                formStatus.className = 'form-status success';
                
                // Clear form fields
                contactForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
                lucide.createIcons();

                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        });
    }
});
