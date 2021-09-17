const db = require('../models');
const Galeria = db.galeria;

exports.getImg = (req, res) => {
    Galeria.findOne({
        where : { negocioId : req.body.negocioId}
    })
    .then(async (img) => {
        if(!img){
            return res.status(404).send({ message : 'Imagen no econtrada.'});
        }
        res.status(200).send(img);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.getGalery = (req, res) => {
    Galeria.findAll({
        where : { negocioId : req.body.negocioId}
    })
    .then(async (galeria) => {
        if(!galeria){
            return res.status(404).send({ message : 'Galeria no econtrados.'});
        }
        res.status(200).send(galeria);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.insert = (req, res) => {
    Galeria.create({
        img : req.body.img,
        negocioId : req.body.negocioId
    }).then(() => {
        res.send({ message : 'Imagen Registrada Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
};

exports.delete = (req, res) => {
    Galeria.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Imagen Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.deleteGalery = (req, res) => {
    Galeria.destroy({
        where : {
            negocioId : req.body.negocioId
        }
    }).then(() => {
        res.send({ message : 'Imagen Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};