function queryAddEvent(query, eventName, action) {
    Array.from(document.querySelectorAll(query)).forEach(element => {
        element.addEventListener(eventName, (event) => {
            action(element, event)
        });
    });
}

export { queryAddEvent };