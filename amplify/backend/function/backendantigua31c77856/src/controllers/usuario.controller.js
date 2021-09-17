const db = require("../models");
const Usuario = db.usuario;
const jwt = require('jsonwebtoken');
const RefreshToken = db.refreshToken;
const config = require('../config/auth.config');

exports.get = (req, res) => {
    Usuario.findAll()   
    .then(async (usuarios) => {
        if(!usuarios){
            return res.status(404).send({ message : 'Usuarios no econtrados.'});
        }
        res.status(200).send(usuarios);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.insert = (req, res) => {
    //Username
    Usuario.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Username duplicate"
            });
            return;
        }
        // Correo
        Usuario.findOne({
            where: {
                correo : req.body.correo
            }
        }).then(email => {
            if (email) {
                res.status(400).send({
                    message: "Email duplicate"
                });
                return;
            }
    
            Usuario.create({
                nombre : req.body.nombre,
                telefono : req.body.telefono,
                username : req.body.username,
                password : req.body.password,
                correo : req.body.correo,
                rol : req.body.rol,
                nacimiento : req.body.nacimiento,
                genero : req.body.rol,
                img : req.body.img
            }).then(() => {
                res.send({ message : 'Usuario Registrado!!!'})
            }).catch(err => {
                res.status(500).send({ message : err.message })
            });
        });
    });
};

exports.delete = (req, res) => {
    Usuario.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Usuario Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.getUser = (req, res) => {
    Usuario.findOne({
        where : { username : req.body.username}
    })
    .then(async (usuario) => {
        if(!usuario){
            return res.status(404).send({ message : 'Usuario no econtrados.'});
        }
        res.status(200).send(usuario);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.signin = (req, res) => {
    Usuario.findOne({
        where : { username : req.body.username }
    })
    .then( async (usuario) => {
        
        if(!usuario){
            return res.status(404).send({ message : "Error en Usuario o Contraseña!"});
        }

        if(req.body.password != usuario.password){
            return res.status(404).send({ message : "Error en Usuario o Contraseña!!"});
        }
        
        const token = jwt.sign({ id: usuario.id }, config.secret, {
            expiresIn: config.jwtExpiration
        });

        let refreshToken = await RefreshToken.createToken(usuario);
        
        res.status(200).send({
            id : usuario.id,
            username : usuario.username,
            correo : usuario.correo,
            accessToken : token,
            refreshToken : refreshToken
        });
    })
    .catch( err => {
        console.log("500 ERROR => ", err);
        res.status(500).send({ message : err.message });
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
    
        //console.log(refreshToken)
    
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
    
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });
            
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }
    
        const usuario = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: usuario.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
    
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
  };