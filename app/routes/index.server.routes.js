module.exports = function (app) {
    const index = require('../controllers/index.server.controllers.js');
    app.get('/', index.render);
};