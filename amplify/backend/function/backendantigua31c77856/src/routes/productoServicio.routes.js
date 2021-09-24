const controller = require('../controllers/productoServicio.controller');

module.exports = (app) =>{
    app.get('/api/producto', controller.getProducto);
    
    app.post('/api/productos', controller.getProductos);

    app.post('/api/producto', controller.insert);
    
    app.delete('/api/producto', controller.delete);

    app.delete('/api/productos', controller.deleteProducts);
}