const HTTP = require('./HTTP');
const Alpine = require('alpinejs').default;

const API_url = "http://api.degheselle.local:4001";


HTTP.setBeforeSend((xhr) => {
    if (Alpine.store('data').user)
    {
        xhr.setRequestHeader('Authorization', 'Bearer ' + Alpine.store('data').user.token);
    }
});
HTTP.setOnError((xhr, resp) => {
    if (xhr.status == 401)
    {
        Alpine.store('data').user = null;
    }
});

function getCurrentUser()
{
    return HTTP.request('get', API_url + '/current-user');
}

function login(username, password)
{
    return HTTP.request('post', API_url + '/auth/login', undefined, {
        'Authorization': 'Basic ' + window.btoa(username + ':' + password)
    });
}

function getRessourceFilter(path) {
    return HTTP.request('get', API_url + '/ressources-filters' + ((path)? '?path=' + path : ''));
}

function getRessource(id) {
    return HTTP.request('get', API_url + '/ressources/' + id);
}

function remove(id) {
    return HTTP.request('delete', API_url + '/ressources/' + id);
}
function add(ressource) {
    return HTTP.request('post', API_url + '/ressources', ressource);
}
function edit(ressource) {
    return HTTP.request('put', API_url + '/ressources/' + ressource._id, ressource);
}

function exportAll() {
    // FIXME : proper file download system
    window.open(API_url + '/export-ressources', '_blank').focus();
}
function importAll(ressources) {
    return HTTP.request('post', API_url + '/import-ressources', ressources);
}

module.exports = {
    getCurrentUser,
    login,
    getRessourceFilter,
    getRessource,
    remove,
    add,
    edit,
    exportAll,
    importAll
}