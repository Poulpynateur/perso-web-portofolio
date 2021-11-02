const Alpine = require('alpinejs').default;
const drawdown = require('../vendors/drawdown');

module.exports = () => ({
    convert(src) {
        return drawdown(src);
    }
});