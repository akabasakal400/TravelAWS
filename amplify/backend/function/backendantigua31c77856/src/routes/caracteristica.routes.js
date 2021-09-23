const controller = require('../controllers/caracteristica.controller')

module.exports = (app) => {
    app.post('/api/carte', controller.insert)

    app.post('/api/carte/producto', controller.get)

    app.delete('/api/carte', controller.delete)
}