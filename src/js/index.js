require('../scss/styles.scss');

function queryAddEvent(query, eventName, action) {
    Array.from(document.querySelectorAll(query)).forEach(element => {
        element.addEventListener(eventName, (event) => {
            action(element, event)
        });
    });
}

queryAddEvent('.layout-navigator', 'click', (source) => {
    Array.from(document.querySelectorAll('.layout, #welcome')).forEach((layout) => {
        layout.classList.remove('active');
    });
    document.getElementById(source.dataset.target).classList.add('active');
});

queryAddEvent('.button-collapse', 'click', (source) => {
    document.getElementById(source.dataset.target).classList.toggle('active');
});
queryAddEvent('.button-collapse', 'mouseenter', (source) => {
    document.getElementById(source.dataset.target).classList.add('active');
});
queryAddEvent('#menu-aside', 'mouseleave', (source) => {
    document.getElementById(source.dataset.target).classList.remove('active');
});

/** Scroll **/
const scrollOffset = 50;

function sectionRelated(activeId) {
    Array.from(document.querySelectorAll('.section-related')).forEach(element => {
        element.classList.remove('active');
        if (element.dataset.target === activeId) {
            element.classList.add('active');
        }
    });
}

window.onscroll = function() {
    // Active section
    let scrollTarget;
    Array.from(document.querySelectorAll('.section')).forEach(element => {
        element.classList.remove('active');
        if (element.getBoundingClientRect().top < scrollOffset)
            scrollTarget = element;
    });

    scrollTarget.classList.add('active');
    sectionRelated(scrollTarget.id);

    // Nav menu
    if (scrollTarget.id === 'welcome') 
        this.document.getElementById('menu-aside').classList.remove('active');
    else
        this.document.getElementById('menu-aside').classList.add('active');
};