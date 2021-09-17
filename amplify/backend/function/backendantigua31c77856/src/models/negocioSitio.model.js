module.exports = (sequelize, Sequelize) => {
    const Negocio = sequelize.define('negocio', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : Sequelize.STRING
        },
        categoria : {
            type : Sequelize.CHAR
        },
        direccion : {
            type : Sequelize.STRING
        },
        abre : {
            type : Sequelize.TIME
        },
        cierra : {
            type : Sequelize.TIME
        },
        telefono : {
            type : Sequelize.STRING
        },
        descripcion : {
            type : Sequelize.STRING
        },
        aut : { 
            type : Sequelize.CHAR
        },
        lat : {
            type : Sequelize.DECIMAL(10,8)
        },
        lng : {
            type : Sequelize.DECIMAL(10,8)
        },
    },{
        freezeTableName : true
    });
    
    return Negocio;
};