// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.dataset.theme = currentTheme;
        if (currentTheme === 'dark') {
            themeToggle.classList.add('active');
        }
    } else {
        // Default to light theme
        body.dataset.theme = 'light';
    }

    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', body.dataset.theme);
        themeToggle.classList.toggle('active');
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
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

    function animateSkills() {
        skillBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        });
    }

    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const projectModalContent = document.querySelector('.project-modal__content');
    const closeModalBtn = document.querySelector('.project-modal__close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-card__title').textContent;
            const description = card.dataset.description;
            const imageSrc = card.querySelector('img').src;
            const liveLink = card.dataset.live;
            const githubLink = card.dataset.github;
            const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];

            projectModalContent.innerHTML = `
                <button type="button" class="project-modal__close-btn">&times;</button>
                <div class="project-modal__image">
                    <img src="${imageSrc}" alt="${title}">
                </div>
                <h3 class="project-modal__title">${title}</h3>
                <p class="project-modal__description">${description}</p>
                ${tags.length > 0 ? `<div class="project-modal__tech-stack">${tags.map(tag => `<span class="project-modal__tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                <div class="project-modal__links">
                    ${liveLink ? `<a href="${liveLink}" target="_blank" class="project-modal__link-btn project-modal__link-btn--live">Live Demo</a>` : ''}
                    ${githubLink ? `<a href="${githubLink}" target="_blank" class="project-modal__link-btn project-modal__link-btn--github">GitHub</a>` : ''}
                </div>
            `;

            const newCloseModalBtn = projectModalContent.querySelector('.project-modal__close-btn');
            newCloseModalBtn.addEventListener('click', () => {
                projectModal.classList.remove('open');
            });

            projectModal.classList.add('open');
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.classList.remove('open');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('open');
        }
    });
});