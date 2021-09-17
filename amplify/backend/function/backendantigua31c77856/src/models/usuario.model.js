module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : Sequelize.STRING
        },
        telefono : {
            type : Sequelize.INTEGER
        },
        username : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        },
        correo : {
            type : Sequelize.STRING
        },
        rol : {
            type : Sequelize.CHAR
        },
        nacimiento : {
            type : Sequelize.DATE
        },
        genero : {
            type : Sequelize.CHAR
        },
        img : {
            type : Sequelize.STRING
        }
    },{
        freezeTableName : true
    });

    return Usuario;
};