module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto_Servicio', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : Sequelize.STRING
        },
        descripcion : {
            type : Sequelize.STRING
        },
        valor : {
            type : Sequelize.DECIMAL(10,2)
        },
        img : {
            type : Sequelize.STRING
        },
    },{
        freezeTableName : true
    });

    return Producto;
};