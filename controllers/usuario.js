var Usuario = require('../models/usuario')
const service = require('../services')



function saveUsuario(req, res) {

    var usuario = new Usuario({
        nombreCompleto: req.body.nombreCompleto,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
        estado: req.body.estado,
        fechaCreacion: req.body.fechaCreacion,
    });


    if (usuario.fechaCreacion != null) {
        if (usuario.estado != null) {
            if (usuario.contrasenia != null) {
                if (usuario.correo != null) {
                    if (usuario.nombreCompleto != null) {
                        usuario.save((err, usuarioStored) => {
                            if (err) {
                                res.status(500).send({ message: `${err}`.slice(17) })
                            } else {
                                res.status(200).send({ usuario: usuarioStored, token: service.createToken(usuario) })
                            }
                        })
                    } else {
                        res.status(300).send({ message: 'El nombre del usuario no debe estar vacío' })
                    }
                } else {
                    res.status(300).send({ message: 'El correo del usuario no debe estar vacío' })
                }
            } else {
                res.status(300).send({ message: 'La contraseña del usuario no debe estar vacía' })
            }
        } else {
            res.status(300).send({ message: 'El estado del usuario no debe estar vacío' })
        }
    } else {
        res.status(300).send({ message: 'La fecha de creación del usuario no debe estar vacía' })
    }
}


function getUsuarios(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!usuarios) return res.status(404).send({ message: `No existen usuarios` })
        res.send(200, { usuarios })
    })
}

function getUsuario(req, res) {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!usuarioId) return res.status(404).send({ message: `El usuario no existe` })
        res.status(200).send({ usuario })
    })
}

function updateUsuario(req, res) {
    let usuarioId = req.params.usuarioId
    let update = req.body
    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
        if (err) {
            return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` })
        } else {
            res.status(200).send({ usuario: usuarioUpdate })
        }
    })


}

function deleteUsuario(req, res) {


    let usuarioId = req.params.usuarioId

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` })

        usuario.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` })
            res.status(200).send({ message: `El usuario ha sido eliminado` })
        })
    })
}


function signIn(req, res) {
    Usuario.findOne({ correo: req.body.correo }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` })
        if (!user) return res.status(404).send({ message: `No existe el usuario: ${req.body.correo}` })
        if (user.estado == 'Inactivo') return res.status(404).send({ message: 'El usuario está inactivo' })

        return user.comparePassword(req.body.contrasenia, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.correo}` })
            req.user = user
            return res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user),
                id: user._id
            })

        });
    }).select('_id correo contrasenia estado');
}

module.exports = {
    saveUsuario,
    getUsuario,
    getUsuarios,
    updateUsuario,
    signIn,
    deleteUsuario
}