const api = require('../services/api');

const Alpine = require('alpinejs').default;
const ressource = require('./ressource')();

module.exports = () => ({
    error: false,
    form: {
        username: '',
        password: ''
    },
    getCurrentUser() {
        api.getCurrentUser().then((user) => {
            Alpine.store('data').user = user;
        }).catch(() => {});
    },
    login() {
        api.login(this.form.username, this.form.password).then((user) => {
            Alpine.store('data').user = user;
            window.dispatchEvent(new Event('login-modal'));
            ressource.getRessource();
        }).catch((err) => {
            console.error(err);
            this.error = true;
        });
    },
    disconnect() {
        Alpine.store('data').user = null;
    }
})