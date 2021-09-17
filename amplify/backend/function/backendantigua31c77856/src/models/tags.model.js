module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define('tags', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        tag : {
            type : Sequelize.STRING
        },
    });

    return  Tag;
}