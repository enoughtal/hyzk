export default function (app) {
    const server = require('../controllers/server.controllers');
    app.get('/', server.render);
}