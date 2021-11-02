const Alpine = require('alpinejs').default;
const router = require('../services/router');
const api = require('../services/api');

function getPath(ressource)
{
    if (!ressource) ressource = Alpine.store('data').ressource;
    if (!ressource || !Object.keys(ressource).length) return [];

    const path = [...ressource.meta.path];
    path.push(ressource.name);
    return path.filter(Boolean);
}

module.exports = () => ({
    modal: {
        data: {},
        // JS LET ME CLONE STUFF PLEASE
        fromRessource(event) {
            const ressource = event?.data || {};
            this.data.name = ressource.name;
            this.data.type = ressource.type;
            this.data.url = ressource.props?.url;
            this.data.thumbnail = ressource.props?.thumbnail;
            this.data.auth = ressource.meta?.auth;

            if (ressource.props?.tags) {
                this.data.tags = ressource.props.tags.join(';');
            }
        },
        toRessource() {
            const parentPath = getPath(Alpine.store('data').ressource);
            let tags = [];
            if (this.data.tags) tags = this.data.tags.split(';');

            return {
                name: this.data.name,
                type: this.data.type,
                props: {
                    url: this.data.url,
                    thumbnail: this.data.thumbnail,
                    tags: tags
                },
                meta: {
                    auth: this.data.auth,
                    path: parentPath
                }
            };
        }
    },
    getBreadcrumb() {
        const path = getPath();
        path.unshift('.');
        return path;
    },
    goToBreadcrumb(index) {
        // Go to root
        if (!index) router.setPath('');
        else        router.setPath(getPath().slice(0, index).join('/'));

        this.getRessource();
    },
    getRessource(id)
    {
        const apiCall = (id) ? api.getRessource(id) : api.getRessourceFilter(router.getPath());
        apiCall.then((ressource) => {
            Alpine.store('data').ressource = ressource;
            if (Alpine.store('data').isFolder())
            {
                Alpine.store('data').filtered = Alpine.store('data').ressource.childrens;
            }
            router.setPath(getPath(ressource).join('/'));
        })
    },
    add() {
        window.dispatchEvent(new CustomEvent('ressource-modal', { detail: {callback: (ressource) => {
            api.add(ressource).then((result) => {
                Alpine.store('data').ressource.childrens.push(result);
            });
        }}}));
    },
    edit(ressource) {
        const id = ressource._id;
        window.dispatchEvent(new CustomEvent('ressource-modal', { detail: {data: ressource, callback: (ressource) => {
            ressource._id = id;
            console.log(ressource);
            api.edit(ressource).then((edited) => {
                const index = Alpine.store('data').ressource.childrens.findIndex((d) => {
                    return d.id == edited.id;
                });
                Alpine.store('data').ressource.childrens[index] = edited;
            });
        }}}));
    },
    remove(ressource) {
        if (window.confirm(`Supprimer "${ressource.name}"" ?`))
        {
            api.remove(ressource._id).then(() => {
                Alpine.store('data').ressource.childrens = Alpine.store('data').ressource.childrens.filter(obj => obj._id !== ressource._id);
            });
        }
    },
    exportAll() {
        api.exportAll();
    },
    importAll() {
        const input = document.getElementById('importRessources');
        input.click();
        input.onchange = () => {
            const selectedFile = input.files[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.readAsText(selectedFile, "UTF-8");
                reader.onload = function (evt) {
                    api.importAll(JSON.parse(evt.target.result)).then(this.getRessource);
                }
            }
           
        }
    }
})