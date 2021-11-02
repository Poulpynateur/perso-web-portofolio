const Alpine = require('alpinejs').default;

Alpine.store('data', {
    user: null,
    ressource: {},
    filtered: [],
    isFolder() {
        return this.ressource && this.ressource.type == 'folder';
    }
});

// Like putting sock with underpants, mildly uncomfortable
Alpine.data('modal', require('../components/modal'));
Alpine.data('login', require('../components/login'));
Alpine.data('filter', require('../components/filter'));
Alpine.data('markdown', require('../components/markdown'));
Alpine.data('ressource', require('../components/ressource'));
Alpine.data('content', require('../components/content'));