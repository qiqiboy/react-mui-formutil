if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-mui-formutil.esm.production.js');
} else {
    module.exports = require('./react-mui-formutil.esm.development.js');
}
