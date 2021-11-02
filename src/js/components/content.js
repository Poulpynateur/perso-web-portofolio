const Alpine = require('alpinejs').default;
const api = require('../services/api');

// TODO : create special API routes (use id for content ?)

module.exports = () => ({
    modal: {
        data: {},
        setData(event) {
            if (event.data) this.data = event.data;
        }
    },
    add() {
        window.dispatchEvent(new CustomEvent('content-modal', { detail: {callback: (content) => {
            if (!Alpine.store('data').ressource.contents) Alpine.store('data').ressource.contents = [];
            Alpine.store('data').ressource.contents.push(content);
            api.edit(Alpine.store('data').ressource);
        }}}));
    },
    edit(index, content) {
        window.dispatchEvent(new CustomEvent('content-modal', { detail: {data: content, callback: (edited) => {
            Alpine.store('data').ressource.contents[index] = edited;
            api.edit(Alpine.store('data').ressource);
        }}}));
    },
    remove(index) {
        if (window.confirm(`Supprimer le contenu ?`))
        {
            Alpine.store('data').ressource.contents.splice(index, 1);
            api.edit(Alpine.store('data').ressource);
        }
    }
});