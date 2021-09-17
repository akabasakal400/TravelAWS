const controller = require('../controllers/galeria.controller');

module.exports = (app) => {
    app.get("/api/galeria/img", controller.getImg);

    app.get('/api/galeria', controller.getGalery);

    app.post('/api/galeria/img', controller.insert);
    
    app.delete('/api/galeria', controller.deleteGalery);

    app.delete('/api/galeria/img', controller.delete);
}