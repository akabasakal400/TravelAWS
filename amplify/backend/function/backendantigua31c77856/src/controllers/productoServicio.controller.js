const db = require('../models');
const Producto = db.producto;

exports.insert = (req, res) => {
    Producto.create({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        valor : req.body.valor,
        img : req.body.img,
        negocioId : req.body.negocioId
    }).then(() => {
        res.send({ message : 'Producto Registrado Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
}


exports.getProducto = (req, res) => {
    Producto.findOne({
        where : { id : req.body.id}
    })
    .then(async (producto) => {
        if(!producto){
            return res.status(404).send({ message : 'Producto no econtrado.'});
        }
        res.status(200).send(producto);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.getProductos = (req, res) => {
    Producto.findAll({
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
    Galeria.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Producto Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.deleteProducts = (req, res) => {
    Galeria.destroy({
        where : {
            negocioId : req.body.negocioId
        }
    }).then(() => {
        res.send({ message : 'Productos Eliminados Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};