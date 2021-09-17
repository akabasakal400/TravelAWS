const controller = require('../controllers/valoracion.controller');

module.exports = function (app) {
    app.post('/api/valoracion', controller.insert);

    app.get('/api/valoracion', controller.getValoracion);

    app.get('/api/valoraciones', controller.getValoraciones);

    app.delete('/api/valoracion', controller.delete);
}