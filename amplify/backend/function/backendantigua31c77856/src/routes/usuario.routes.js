const controller = require("../controllers/usuario.controller");

module.exports = function (app) {

    app.get("/api/usuarios", controller.get);

    app.get('/api/usuario', controller.getUser);

    app.post('/api/usuario', controller.insert);

    app.post('/api/signin', controller.signin);
    
    app.post('/api/regfreshToken', controller.refreshToken);
    
    app.delete('/api/usuario', controller.delete);
}