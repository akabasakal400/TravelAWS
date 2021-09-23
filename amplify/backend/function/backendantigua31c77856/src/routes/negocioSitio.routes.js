const authJWT = require('../functions/authJWT');
const controller = require('../controllers/negocioSitio.controller');
module.exports = function(app){
    app.post('/api/verificacion', controller.verification);

    app.get('/api/negocios', controller.get);

    app.post('/api/negocios/categoria', controller.getCategoria);
    
    app.post('/api/negocio', [authJWT.verifyToken], controller.insert);
    //app.post('/api/negocio', controller.insert);

    app.post('/api/email', controller.email);

    app.delete('/api/negocio', controller.delete);
}