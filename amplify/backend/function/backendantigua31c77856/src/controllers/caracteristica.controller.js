const db = require('../models')
const Caracteristca = db.caracteristicas

exports.insert = async (req, res) => {
    Caracteristca.create({
        nombre : req.body.nombre,
        valor : req.body.valor,
        icono : req.body.icono,
        productoServicioId : req.body.productoId
    })
    .then(() => {
        res.status(200).send({ message : 'Caracteristica Agregada'})
    }).catch(err => {
        res.status(500).send({ message : err.message })
    })
}

exports.get = async (req, res) => {
    Caracteristca.findAll({
        where : {
            productoServicioId : req.body.productoId
        }
    })
    .then( caracteristicas => {
        res.status(200).send(caracteristicas);
    })
    .catch( err => {
        res.status(500).send({ message : err.message })
    })
}

exports.delete = async (req, res) => {
    Caracteristca.destroy({
        where : {
            id : req.body.id
        }
    })
    .then( () => {
        res.status(200).send({ message : 'Eliminado!!'})
    })
    .catch( err => {
        res.status(500).send({ message : err.message})
    })
}