module.exports = (sequelize, Sequelize) => {
    const Caracteristicas = sequelize.define('caracteristicas', {
        id : {
            type : Sequelize.INTEGER, 
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : Sequelize.STRING
         },
        valor : {
            type : Sequelize.STRING
        },
        icono : {
            type : Sequelize.STRING
        }
    }, {
        freezeTableName : true
    })

    return Caracteristicas
}