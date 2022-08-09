if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-mui-formutil.cjs.production.js');
} else {
    module.exports = require('./react-mui-formutil.cjs.development.js');
}
