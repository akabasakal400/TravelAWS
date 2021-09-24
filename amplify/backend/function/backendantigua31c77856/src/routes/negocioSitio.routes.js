const authJWT = require('../functions/authJWT');
const controller = require('../controllers/negocioSitio.controller');

module.exports = function(app){
    app.get('/api/negocios', controller.get);

    app.post('/api/verificacion', controller.verification);

    app.post('/api/negocios/categoria', controller.getCategoria);

    app.post('/api/negocios/usuario', controller.getNegocios);
    
    //app.post('/api/negocio', [authJWT.verifyToken], controller.insert);
    app.post('/api/negocio', controller.insert);

    app.put('/api/negocio', controller.update);

    app.delete('/api/negocio', controller.delete);
}