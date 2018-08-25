var del = require('del');

function clean() {
    return del([ './dist/' ]);
}

module.exports = clean;