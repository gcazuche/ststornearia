document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#415A77' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#415A77', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    function animateCounter(element) {
        const target = +element.getAttribute('data-target');
        let count = 0;
        const speed = 200; 
        
        const updateCount = () => {
            const increment = target / speed;
            count += increment;

            if (count < target) {
                element.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                element.innerText = target;
            }
        };
        updateCount();
    }    
    const counterObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); 
            }
         });
    }, { threshold: 0.5 });
    const allCounters = document.querySelectorAll('.counter');
    if(allCounters.length > 0) {
        allCounters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const filterContainer = document.querySelector('.filter-buttons');
    if(filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                filterContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');

                galleryItems.forEach(item => {
                    item.classList.add('hidden'); 
                    if (item.classList.contains(filterValue) || filterValue === 'all') {
                         setTimeout(() => item.classList.remove('hidden'), 10);
                    }
                });
            });
        });
    }
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = "0 20px 20px 20px";
            } else {
                answer.style.maxHeight = 0;
                answer.style.padding = "0 20px";
            }
        });
    });
});