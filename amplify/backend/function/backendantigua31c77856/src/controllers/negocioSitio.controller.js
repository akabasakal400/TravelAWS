const AWS = require('aws-sdk');
const SES = new AWS.SES();
const db = require('../models');
const Negocio = db.negocio;
const Usuario = db.usuario;
const Tags = db.tags;

exports.email = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    var params = {
        Destination: {
            ToAddresses: [
                email,
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `Bienvenido ${name} a Antigua Travel`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: 'antiguatravelservice@gmail.com',
    };
      
    try {
        await SES.sendEmail(params).promise();
        return res.status(200).send({ message : 'Mensaje Enviado Correctamente'});
    } catch (error) {
        console.log('Error al enviar el Email', error);
        return res.status(400).send({ message : "ERROR => " + error});
    }
};

exports.getCategoria = (req, res) => {
    Negocio.findAll({
        where : {
            categoria : req.body.categoria
        }
    })
    .then(async (negocios) =>{
        if(!negocios){
            return res.status(404).send({ message : 'Aún no hay negocios en esta categoría'});
        }

        res.status(200).send(negocios)
    })
    .catch(err => {
        res.status(500).send({ message : err.message})
    })
}

exports.get = (req, res) => {
    let restaurantes = []
    let hoteles = []
    let sitios = []
    let cambistas = []
    let rentas = []
    let extras = []

    Negocio.findAll({
        order : [['categoria', 'ASC']]
    })
    .then(async (negocios) => {
        if(!negocios){
            return res.status(404).send({ message : 'Negocios no econtrado.'});
        }

        negocios.forEach( negocio => {
            switch(negocio.categoria){
                case 'R' :
                    restaurantes.push(negocio);
                    break;
                case 'H' :
                    hoteles.push(negocio);
                    break;
                case 'S' :
                    sitios.push(negocio);
                    break;
                case 'C' : 
                    cambistas.push(negocio);
                    break;
                case 'RC' :
                    rentas.push(negocio);
                    break;
                default :
                    extras.push(negocio);
            }
        });

        let response = { restaurantes : restaurantes, hoteles : hoteles, sitios : sitios, cambistas : cambistas, rentas : rentas, extras : extras }

        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.insert = (req, res) => {
    const tags = req.body.tags;

    Negocio.create({
        nombre : req.body.nombre,
        categoria : req.body.categoria,
        direccion : req.body.direccion,
        abre : req.body.abre,
        cierra : req.body.cierra,
        telefono : req.body.telefono,
        descripcion : req.body.descripcion,
        aut : 'f',
        lat : req.body.coordenadas.latitud,
        lng : req.body.coordenadas.longitud,
        usuarioId : req.body.usuarioId
    }).then( async (negocio) => {
        let insertTags = [];
        tags.forEach( tagArray => {
            insertTags.push({ tag : tagArray, negocioId : negocio.id});   
        });

        Tags.bulkCreate(insertTags)
        .then(() => {
            /*Usuario.findOne({
                where : {
                    id : req.body.usuarioId
                }
            })
            .then(async (usuario) => {
                let destino = usuario.correo;

                var params = {
                    Destination : {
                        ToAddresses : [
                            destino,
                        ]
                    },
                    Message : {
                        Body : {
                            Text : {
                                Charset: "UTF-8",
                                Data: `Damos la bienvenida a ${req.body.nombre} a la familia AntiguaTravel, para completar el proceso de registro ingresa al siguiente link LINK DEL API PARA CAMBIAR LA BANDERA DEL NEGOCIO`
                            }
                        },
                        Subject: {
                            Charset: 'UTF-8',
                            Data: 'Verificación de Registro Antigua Travel'
                        }
                    },
                    Source: 'antiguatravelservice@gmail.com',   
                }
                
                try {
                    await SES.sendEmail(params).promise();
                    //return res.status(200).send({ message : 'Mensaje Enviado Correctamente'});
                } catch (error) {
                    //console.log('Error al enviar el Email', error);
                    return res.status(400).send({ message : "ERROR => " + error});
                }
            })
            .catch(
                res.status(500).send({ message : err.message })
            )*/
        })
        .catch( err => {
            res.status(500).send({ message : err.message })    
        })

        res.status(200).send({ message : negocio.id });

    }).catch( err => {
        res.status(500).send({ message : err.message })
    });
};

exports.delete = (req, res) => {
    Negocio.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Negocio Eliminado Correctamente!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};