module.exports = () => ({
    isOpen: false,
    callback: null,
    modalCallback(data) {
        if (this.callback) this.callback(data);
        this.modalToggle();
    },
    modalToggle(event) {
        this.isOpen = !this.isOpen;
        this.callback = event?.callback;
    }
});