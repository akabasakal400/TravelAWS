const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).send({ message : 'Acceso no Autorizado, Inicie Sesión Nuevamente '});
    }

    return res.status(401).send({ message : 'Acceso no Autorizado' });
};

const verifyToken = (req, res, next) => {
    let token = req.headers[`x-access-token`];

    if(!token){
        return res.status(403).send({ message : 'No se proporciono un token'});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return catchError(err, res)
        }

        req.usuarioId = decoded.id;
        next();
    });
}

const authJWT = {
    verifyToken : verifyToken
};

module.exports = authJWT;