module.exports = (sequelize, Sequelize) => {
    const Valoracion = sequelize.define('valoracion', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        puntuacion : {
            type : Sequelize.INTEGER
        },
        comentario : {
            type : Sequelize.TEXT
        },
    },{
        freezeTableName : true
    });

    return Valoracion;

};