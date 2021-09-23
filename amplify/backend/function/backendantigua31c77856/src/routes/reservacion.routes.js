const controller = require('../controllers/reservacion.controller')

module.exports = function (app){
    //app.get('/api/reservacion', controller.getReservas) 

    app.post('/api/reservacion', controller.insert)
}