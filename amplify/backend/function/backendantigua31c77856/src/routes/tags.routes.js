const controller = require('../controllers/tags.controller')

module.exports = function (app){
    app.post('/api/tags', controller.search)

    app.get('/api/tags', controller.get)
}