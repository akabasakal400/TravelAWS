module.exports = (sequelize, Sequelize) => {
    const Reservacion = sequelize.define('reservacion', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        fechaInicio : {
            type : Sequelize.DATE
        },
        fechaFinal : {
            type : Sequelize.DATE
        },
        valor : {
            type : Sequelize.DECIMAL(10, 2)
        },
    },{
        freezeTableName : true
    });
    
    return Reservacion;
};