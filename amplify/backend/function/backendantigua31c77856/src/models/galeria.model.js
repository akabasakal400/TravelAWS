module.exports = (sequelize, Sequelize) => {
    const Galeria = sequelize.define('galeria', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        img : {
            type : Sequelize.STRING
        }
    }, {
        freezeTableName : true
    });

    return Galeria;
}