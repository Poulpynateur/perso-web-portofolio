const scrollOffset = 50;

function isInviewPort(element) {
    return element.getBoundingClientRect().top > scrollOffset
    && element.getBoundingClientRect().top + element.getBoundingClientRect().height  < scrollOffset + window.innerHeight;
}

function popAnimation() {
    Array.from(document.querySelectorAll('.scroll-reveal')).forEach(element => {
        if (isInviewPort(element)) {
            if(element.dataset.delay)
                setTimeout( () => element.classList.add('show'), element.dataset.delay);
            else 
                element.classList.add('show');
        }
    });
}

function getActiveSection() {
    let scrollTarget;
    Array.from(document.querySelectorAll('.section')).forEach(element => {
        element.classList.remove('active');
        if (element.getBoundingClientRect().top < scrollOffset)
            scrollTarget = element;
    });
    scrollTarget.classList.add('active');
    return scrollTarget;
}

function activateSectionRelated(activeId) {
    Array.from(document.querySelectorAll('.section-related')).forEach(element => {
        element.classList.remove('active');
        if (element.dataset.target === activeId) {
            element.classList.add('active');
        }
    });
}

function toggleAsideMenu(activeId) {
    if (activeId === 'welcome') 
        document.getElementById('menu-aside').classList.remove('active');
    else
        document.getElementById('menu-aside').classList.add('active');

    document.getElementById('menu-nav').classList.remove('active');
}

function backgroundScroll() {
    document.getElementById('svg-background').style.top = `-${window.scrollY/4}px`;
}

function onScroll() {
    popAnimation();

    // Active section
    let scrollTarget = getActiveSection();

    activateSectionRelated(scrollTarget.id);
    toggleAsideMenu(scrollTarget.id);

    backgroundScroll();
}

export { onScroll, popAnimation };