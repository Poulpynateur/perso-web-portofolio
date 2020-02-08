require('../scss/styles.scss');

function queryAddEvent(query, eventName, action) {
    Array.from(document.querySelectorAll(query)).forEach(link => {
        link.addEventListener(eventName, action);
    });
}

queryAddEvent('.layout-navigator', 'click', (event) => {
    Array.from(document.querySelectorAll('.layout, #welcome')).forEach((layout) => {
        layout.classList.remove('active');
    });
    document.getElementById(event.target.dataset.target).classList.add('active');
});

const maxScroll = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
window.onscroll = () => {
    console.log(window.scrollY, maxScroll);
};