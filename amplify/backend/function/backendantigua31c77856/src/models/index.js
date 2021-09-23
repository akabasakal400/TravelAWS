const config = require("../config/db.config");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.caracteristicas = require('../models/caracteristica.model')(sequelize, Sequelize);
db.usuario = require('../models/usuario.model')(sequelize, Sequelize);
db.galeria = require('../models/galeria.model')(sequelize, Sequelize);
db.negocio = require('../models/negocioSitio.model')(sequelize, Sequelize);
db.producto = require('../models/productoServicio.model')(sequelize, Sequelize);
db.reservacion = require('../models/reservacion.model')(sequelize, Sequelize);
db.valoracion = require('../models/valoracion.model')(sequelize, Sequelize);
db.refreshToken = require('../models/refreshToken.model')(sequelize, Sequelize);
db.tags = require('../models/tags.model')(sequelize, Sequelize);

db.producto.hasMany(db.caracteristicas);
db.caracteristicas.belongsTo(db.producto);

db.usuario.hasMany(db.negocio);
db.negocio.belongsTo(db.usuario);

db.negocio.hasMany(db.galeria);
db.galeria.belongsTo(db.negocio);

db.negocio.hasMany(db.producto);
db.producto.belongsTo(db.negocio);

db.usuario.hasMany(db.reservacion);
db.reservacion.belongsTo(db.usuario);

db.negocio.hasMany(db.reservacion);
db.reservacion.belongsTo(db.negocio);

db.usuario.hasMany(db.valoracion);
db.valoracion.belongsTo(db.usuario);

db.producto.hasMany(db.reservacion);
db.reservacion.belongsTo(db.producto);

db.negocio.hasMany(db.valoracion);
db.valoracion.belongsTo(db.negocio);

db.refreshToken.belongsTo(db.usuario, {
    foreignKey : 'usuarioId',
    targetKey : 'id',
});

db.usuario.hasOne(db.refreshToken, {
    foreignKey : 'usuarioId', 
    targetKey : 'id',
});

db.negocio.hasMany(db.tags);
db.tags.belongsTo(db.negocio);

module.exports = db;