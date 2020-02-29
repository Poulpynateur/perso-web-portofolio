require('../scss/styles.scss');

import { queryAddEvent } from './utils.js';
import { initSvg } from './svg.js';
import { onScroll } from './scroll.js';

/**** Init ****/
initSvg();

/**** Events listener ****/
window.onscroll = onScroll;

queryAddEvent('.layout-navigator', 'click', (source) => {
    Array.from(document.querySelectorAll('.layout, #welcome')).forEach((layout) => {
        layout.classList.remove('active');
    });
    document.getElementById(source.dataset.target).classList.add('active');
});

queryAddEvent('.project-content', 'click', (source) => {
    Array.from(document.querySelectorAll('.project-content')).forEach((card) => {
        card.classList.remove('active');
    });
    source.classList.toggle('active');
});

// Menu aside
queryAddEvent('.button-collapse', 'click', (source) => {
    document.getElementById(source.dataset.target).classList.toggle('active');
});
queryAddEvent('.button-collapse', 'mouseenter', (source) => {
    document.getElementById(source.dataset.target).classList.add('active');
});
queryAddEvent('#menu-aside', 'mouseleave', (source) => {
    document.getElementById(source.dataset.target).classList.remove('active');
});