const db = require('../models');
const Reserva = db.reservacion;
const Op = db.Sequelize.Op;

exports.insert = (req, res) => {
    Reserva.create({
        fechaInicio : req.body.fechaInicio,
        fechaFinal : req.body.fechaFinal,
        valor : req.body.valor,
        usuarioId : req.body.usuarioId,
        negocioId : req.body.negocioId
    }).then(() => {
        res.send({ message : 'Usuario Registrado Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
}

exports.getReserva = (req, res) => {
    Reserva.findOne({
        where : { id : req.body.id}
    })
    .then(async (reserva) => {
        if(!reserva){
            return res.status(404).send({ message : 'Reserva no econtrada.'});
        }
        res.status(200).send(reserva);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.getReservas = (req, res) => {
    Reserva.findAll({
        where : { negocioId : req.body.negocioId}
    })
    .then(async (productos) => {
        if(!productos){
            return res.status(404).send({ message : 'Productos no econtrados.'});
        }
        res.status(200).send(productos);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.delete = (req, res) => {
    Reserva.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Producto Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
}

exports.deleteReservas = (req, res) => {
    Reserva.destroy({
        where : {
            [Op.and] : [ 
                { id : req.body.id },
                { negocioId : req.body.negocioId }
            ]
        }
    }).then(() => {
        res.send({ message : 'Productos Eliminados Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};