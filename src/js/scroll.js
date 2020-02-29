const scrollOffset = 50;

function setActiveSection() {
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
    // Active section
    let scrollTarget = setActiveSection();

    activateSectionRelated(scrollTarget.id);
    toggleAsideMenu(scrollTarget.id);

    backgroundScroll();
    
}

export { onScroll };