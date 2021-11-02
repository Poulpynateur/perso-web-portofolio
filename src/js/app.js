const Alpine = require('alpinejs').default;
require('./services/store');

const ressource = require('./components/ressource')();
const login = require('./components/login')();

function init() {
    login.getCurrentUser();
    ressource.getRessource();
    
    Alpine.start();
}

module.exports = {init}