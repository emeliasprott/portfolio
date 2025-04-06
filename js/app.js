document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('#nav-links');
    const nav_links = nav.querySelectorAll('a');
    const sections = document.querySelectorAll('.main-content-container');
    const logo = document.querySelector('.main-content svg#logo');
    const aboutPage = document.querySelector('#about.main-content-container');
    const navBar = document.querySelector('nav');
    const headerPage = document.querySelector('#header');
    const logoText = Array.from(logo.querySelectorAll('path'));
    const skillsPage = document.getElementById('skills');
    const projects = document.getElementById('projects');
    const projectsHeader = document.getElementById('projects-header');
    const projectContainer = document.getElementById('project-container');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardContainer = document.getElementById('project-card-container');
    const projectDescriptions = document.querySelectorAll('#project-description .project-description-content');
    const contact = document.getElementById('contact');
    const aboutContent = document.querySelector('#about > .main-content');
    const skillsHeader = document.querySelector('.tldr-container');
    const skillsNotes = document.querySelectorAll('.skill-column');

    aboutPage.style.opacity = '0';
    headerPage.backgroundColor = 'var(--mauve)';
    let aboutPageScrolledIntoView = false;
    navBar.style.opacity = '1';
    // HEADER NAV
    const headerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navBar.classList.remove('light');
                navBar.classList.remove('enhanced');
                navBar.classList.add('mauve');
            }
        });
    }, { threshold: 0.15 });
    headerObserver.observe(headerPage);
    // PROJECTS NAV
    const projectTopObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navBar.classList.remove('mauve');
                navBar.classList.remove('enhanced');
                navBar.classList.add('light');
            }
        });
    }, { threshold: 0.15 });
    projectTopObserver.observe(projects);
    // SKILLS NAV
    const skillsTopObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navBar.classList.remove('mauve');
                navBar.classList.remove('enhanced');
                navBar.classList.add('light');
            }
        });
    }, { threshold: 0.15 });
    skillsTopObserver.observe(skillsPage);
    // CONTACT NAV
    const contactTopObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navBar.classList.remove('mauve');
                navBar.classList.remove('enhanced');
                navBar.classList.add('light');
            }
        });
    }, { threshold: 0.45 });
    contactTopObserver.observe(contact);
    // ABOUT NAV AND SMOOTH SCROLL
    const aboutObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const entryTop = entry.boundingClientRect.top;
            const entryBottom = entry.rootBounds.height - entry.boundingClientRect.bottom;
            if (entry.isIntersecting && entryBottom > entryTop) {
                aboutPage.scrollIntoView({ behavior: 'smooth', block: 'end' });
                aboutPageScrolledIntoView = true;
            }
            if (entry.isIntersecting) {
                navBar.classList.remove('light');
                navBar.classList.remove('mauve');
                navBar.classList.add('enhanced');
            }
        });
    }, { threshold: 0.3 });
    aboutObserver.observe(aboutPage);
    // PROJECTS SMOOTH SCROLL
    const projectsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const entryTop = entry.boundingClientRect.top;
            const entryBottom = entry.rootBounds.height - entry.boundingClientRect.bottom;
            if (entry.isIntersecting) {
                setTimeout(() => {
                    projectContainer.classList.add('in-view');
                    projectsHeader.classList.add('in-view');
                }, 250);
                if (entryTop > entryBottom) {
                    projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    projects.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            } else {
                projectContainer.classList.remove('in-view');
                projectsHeader.classList.remove('in-view');
            }
        });
    }, { threshold: 0.4 });
    projectsObserver.observe(projects);
    // SKILLS SMOOTH SCROLL
    const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const entryTop = entry.boundingClientRect.top;
            const entryBottom = entry.rootBounds.height - entry.boundingClientRect.bottom;
            if (entry.isIntersecting) {
                if (entryTop > entryBottom) {
                    skillsPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    skillsPage.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }
        });
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsPage);
    // CONTACT SMOOTH SCROLL
    const contactObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const entryTop = entry.boundingClientRect.top;
            const entryBottom = entry.rootBounds.height - entry.boundingClientRect.bottom;
            if (entry.isIntersecting) {
                if (entryTop > entryBottom) {
                    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    contact.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }
        });
    }, { threshold: 0.4 });
    contactObserver.observe(contact);
    // PROJECTS ANIMATION
    let activeProject = null;
    let isAnimating = false;
    projectCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isAnimating) return;
            isAnimating = true;
            const descriptionID = `description-${index + 1}`;
            const description = document.getElementById(descriptionID);
            if (activeProject === index) {
                resetPositions();
                return;
            }
            if (activeProject !== null) {
                document.getElementById(`description-${activeProject + 1}`).style.right = '-100%';
                document.getElementById(`description-${activeProject + 1}`).style.opacity = '0';
                setTimeout(() => {
                    showDescription(index, description);
                    isAnimating = false;
                    }, 600);
            } else {
                moveProjectsLeft();
                showDescription(index, description);
                setTimeout(() => {
                    isAnimating = false;
                }, 600);
            }
            activeProject = index;
        });
    });
    projects.addEventListener('click', (e) => {
        if (!e.target.classList.contains('project-card')) {
            resetPositions();
        }
    });
    function moveProjectsLeft() {
        projectCardContainer.classList.add('active');
        projectCardContainer.style.transform = 'translateX(-15%)';
    }
    function showDescription(index, description) {
        projectDescriptions.forEach(desc => {
            desc.style.right = '-100%';
            desc.style.opacity = '0';
        });
        const projectColors = ['var(--orange', 'var(--tower-gray)', '#e0c8ec', 'var(--lime)'];
        description.style.borderLeft = `3px solid ${projectColors[index]}`;
        setTimeout(() => {
            description.style.right = '10%';
            description.style.opacity = '1';
          }, 100);
    }
    function resetPositions() {
        projectDescriptions.forEach(desc => {
          desc.style.right = '-100%';
          desc.style.opacity = '0';
        });
        projectCardContainer.classList.remove('active');
            projectCardContainer.style.transform = 'translateX(0) translateZ(0)';
        activeProject = null;
        setTimeout(() => {
          isAnimating = false;
        }, 500);
    }

    // SKILLS ANIMATION
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const stop = contact.getBoundingClientRect().top + scrollY - 100;
        const start = skillsPage.getBoundingClientRect().top + scrollY + (skillsPage.clientHeight / 4);
        if (scrollY > start && scrollY <= stop) {
            const width = skillsPage.clientWidth;
            const scrollPercentage = (scrollY - start) / (stop - start);
            let movement = -width * scrollPercentage;
            skillsNotes.forEach(note => {
                note.style.transform = `translateX(${movement}px)`;
            });
            skillsHeader.style.transform = `translateX(${movement}px)`;
        } else if (scrollY > stop) {
            skillsNotes.forEach(note => {
                note.style.transform = 'translateX(${skillsPage.clientWidth}px)';
            });
        } else {
            skillsNotes.forEach(note => {
                note.style.transform = 'translateX(0px)';
                note.addEventListener('mouseenter', () => {
                    note.style.transform = 'scale(1.1)';
                    note.style.zIndex = '25';
                    note.style.transition = 'transform 0.3s ease-in-out';
                    note.style.boxShadow = '5px 5px 9px rgba(0, 0, 0, 0.25)';
                });
                note.addEventListener('mouseleave', () => {
                    note.style.transform = 'scale(1)';
                    note.style.zIndex = '10';
                    note.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.2)';
                });
            });
        }
    });
    // NAVIGATION MENU
    nav_links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            if (link.getAttribute('href') === '#projects') {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 50);
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // ABOUT PAGE RESET
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= projects.offsetTop) {
            aboutContent.style.opacity = '1';
            aboutPage.style.backgroundColor = 'var(--link-water)';
            aboutPage.style.backgroundImage = `url("/assets/images/Asset\ 3.svg")`;
        }
    });
    // UPDATING NAVIGATION LINKS
    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            if (scrollY >= sectionTop - 100 && scrollY <= sectionTop + sectionHeight) {
                nav_links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    // HEADER ABOUT TRANSITION
    window.addEventListener('scroll', () => {
        const headerHeight = headerPage.offsetHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = Math.min(1, Math.max(0, scrollPosition / headerHeight));
        function rotationCalc(scrollPercentage) {
            const p = scrollPercentage * 100;
            if (p < 5) {
                return 0;
            }
            const r = (8/5) * p;
            return r;
        }
        function scaleCalc(scrollPercentage) {
            const p = Math.min(100, scrollPercentage * 100);
            if (p < 6.68) {
                return (0.48/6.68) * p + 1;
            }
            const y = (3.23122 * Math.sin((0.0312 * p) - 1.77661)) + 4.71196;
            return y;
        }
        const rotation = rotationCalc(scrollPercentage);
        let navHeight = nav.getBoundingClientRect().height;
        let logoTop = -1 * logo.getBoundingClientRect().y;
        const scale = scaleCalc(scrollPercentage);
        let aboutTop = aboutPage.getBoundingClientRect().top;
        if (navHeight <= logoTop && aboutTop >= navHeight && scrollPercentage > 0.1) {
            navBar.style.transition = 'opacity 0.5s ease';
            navBar.style.opacity = '0';
        } else {
            navBar.style.transition = 'opacity 0.5s ease';
            navBar.style.opacity = '1';
        }
        if (scale > 1.17) {
            logoText.forEach(text => {
                text.style.transition = 'opacity 0.5s ease';
                text.style.fill = `var(--link-water)`;
            });
        } else {
            logoText.forEach(text => {
                text.style.transition = 'opacity 0.75s ease';
                text.style.fill = 'var(--deep-orange)';
            });
        }
        if (scrollPercentage < 1) {
            logo.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        }
        if (scrollPosition >= (aboutPage.offsetTop * 0.5)) {
            aboutPage.style.opacity = '1';
            logo.style.opacity = '0';
            aboutPage.style.backgroundColor = 'var(--link-water)';
            aboutPage.style.backgroundImage = `url("/assets/images/Asset\ 3.svg")`;
            headerPage.style.backgroundColor = 'var(--link-water)';
            if (!aboutPageScrolledIntoView &&
                scrollPosition < (aboutPage.offsetTop * 0.75)) {
                aboutPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                aboutPageScrolledIntoView = true;
            }
        } else {
            aboutPage.style.opacity = '0';
            logo.style.opacity = '1';
            headerPage.style.backgroundColor = `var(--mauve)`;
            aboutPageScrolledIntoView = false;
        }
        if (scrollPosition < 0) {
            headerPage.style.backgroundColor = 'var(--mauve)';
        }
    });
});