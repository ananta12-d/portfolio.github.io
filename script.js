// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');

    // Initialization based on localStorage
    if (currentTheme === 'dark') {
        body.dataset.theme = 'dark';
        themeToggle.classList.add('active');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        body.dataset.theme = 'light';
        themeToggle.classList.remove('active');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        body.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        themeToggle.classList.toggle('active', newTheme === 'dark');
        
        if (newTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // Navigation Bar Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = 'home';
        // Offset scroll position to account for fixed header
        const headerHeight = header.offsetHeight;
        const scrollY = window.pageYOffset + headerHeight + 10; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Run once on load to set initial active link

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.nav__hamburger');
    const navList = document.querySelector('.nav__list');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('open');
        });
    });

    // Typing Animation (Hero Section)
    const typingElement = document.querySelector('.hero__typing');
    const typingText = ['Web Developer', 'Frontend Enthusiast', 'Problem Solver'];
    let typeIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < typingText[typeIndex].length) {
            typingElement.textContent += typingText[typeIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = typingText[typeIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 80);
        } else {
            typeIndex++;
            if (typeIndex >= typingText.length) {
                typeIndex = 0;
            }
            setTimeout(type, 500);
        }
    }

    if (typingElement) {
        setTimeout(type, 1500);
    }

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-bar__fill');
    const skillsSection = document.getElementById('skills');

    function animateSkills() {
        skillBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        });
    }

    // Use Intersection Observer to trigger the animation when the section is visible
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.4 }); // Trigger when 40% of the section is visible

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const projectModalContent = document.querySelector('.project-modal__content');
    
    // Listen to click on the entire card or the specific button
    document.addEventListener('click', (event) => {
        const viewBtn = event.target.closest('.project-card__view-btn');
        const card = event.target.closest('.project-card');

        // Only proceed if the view button was clicked, or a card was clicked and it's not the button itself
        if (viewBtn || (card && !event.target.closest('.project-card__view-btn'))) {
            const targetCard = card || viewBtn.closest('.project-card');

            const title = targetCard.querySelector('.project-card__title').textContent;
            // Retrieve description and links from data attributes
            const description = targetCard.dataset.description;
            const liveLink = targetCard.dataset.live || null;
            const githubLink = targetCard.dataset.github || null;
            
            const imageElement = targetCard.querySelector('img');
            const imageSrc = imageElement ? imageElement.src : 'placeholder.jpg';
            
            const tags = Array.from(targetCard.querySelectorAll('.project-tag')).map(tag => tag.textContent.trim());

            
            // Build the modal content dynamically
            projectModalContent.innerHTML = `
                <button type="button" class="project-modal__close-btn">&times;</button>
                <div class="project-modal__image">
                    <img src="${imageSrc}" alt="${title}">
                </div>
                <h3 class="project-modal__title">${title}</h3>
                <p class="project-modal__description">${description || 'Detailed description coming soon.'}</p>
                ${tags.length > 0 ? `<div class="project-modal__tech-stack">${tags.map(tag => `<span class="project-modal__tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                <div class="project-modal__links">
                    ${liveLink && liveLink !== '#' ? `<a href="${liveLink}" target="_blank" class="project-modal__link-btn project-modal__link-btn--live">Live Demo</a>` : ''}
                    ${githubLink && githubLink !== '#' ? `<a href="${githubLink}" target="_blank" class="project-modal__link-btn project-modal__link-btn--github">GitHub</a>` : ''}
                </div>
            `;

            // Re-attach close listener to the new button
            const newCloseModalBtn = projectModalContent.querySelector('.project-modal__close-btn');
            newCloseModalBtn.addEventListener('click', () => {
                projectModal.classList.remove('open');
            });

            projectModal.classList.add('open');
        }

        // Close modal when clicking outside
        if (event.target === projectModal) {
            projectModal.classList.remove('open');
        }
    });

});
