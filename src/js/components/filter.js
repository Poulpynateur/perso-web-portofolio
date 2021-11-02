const Alpine = require('alpinejs').default;

module.exports = () => ({
    title: "",
    tags: "",
    tagList() {
        const childrens = Alpine.store('data').ressource.childrens;
        const tags = [];
        if (childrens)
        {
            for (let doc of childrens)
            {
                if (doc.tag) {
                    for (let tag of doc.tags)
                    {
                        if (!tags.find((t) => t==tag)) tags.push(tag);
                    }
                }
            }
        }
        return tags.sort();
    },
    apply() {
        const childrens = Alpine.store('data').ressource.childrens;
        if (childrens)
        {
            Alpine.store('data').filtered = childrens.filter((doc) => {
                return (!this.title || doc.name.includes(this.title))
                    && (!this.tags.length || this.tags.every(v => doc.tags.includes(v)));
            });
            Alpine.store('state').toggleFilters();
        }
    }
})