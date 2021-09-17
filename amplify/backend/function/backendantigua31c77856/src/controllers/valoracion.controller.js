const db = require('../models');
const Valoracion = db.valoracion;

exports.insert = (req, res) => {
    Valoracion.create({
        puntuacion : req.body.puntuacion,
        comentario : req.body.comentario,
        usuarioId : req.body.usuarioId,
        negocioId : req.body.negocioId
    }).then(() => {
        res.send({ message : 'Valoracion Registrada Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
}

exports.getValoracion = (req, res) => {
    Valoracion.findOne({
        where : { id : req.body.id}
    })
    .then(async (valoracion) => {
        if(!valoracion){
            return res.status(404).send({ message : 'Valoracion no econtrada.'});
        }
        res.status(200).send(valoracion);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.getValoraciones = (req, res) => {
    Valoracion.findAll({
        where : { negocioId : req.body.negocioId }
    })
    .then(async (valoraciones) => {
        if(!valoraciones){
            return res.status(404).send({ message : 'Valoracioens no econtradas.'});
        }
        res.status(200).send(valoraciones);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.delete = (req, res) => {
    Valoracion.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Valoracion Eliminada Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
}