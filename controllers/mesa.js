var Mesa = require('../models/mesa')

function saveMesa(req, res) {

    var mesa = new Mesa({
        numeroMesa: req.body.numeroMesa,
        observacionMesa: req.body.observacionMesa,
        estadoMesa: req.body.estadoMesa
    });

    if (mesa.numeroMesa != null) {
        if (mesa.observacionMesa != null) {
            if (mesa.estadoMesa != null) {
                mesa.save((err, mesaStored) => {
                    if (err) {
                        res.status(500).send({ message: `${err}`.slice(17) })
                    } else {
                        res.status(200).send({ mesa: mesaStored })
                    }
                })
            } else {
                res.status(300).send({ message: 'El estado de la mesa no puede estar vacío' })
            }
        } else {
            res.status(300).send({ message: 'La descripción de la mesa no puede estar vacía' })
        }
    } else {
        res.status(300).send({ message: 'El número de mesa no puede estar vacío' })

    }
}

function getMesas(req, res) {
    Mesa.find({}, (err, mesas) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!mesas) return res.status(404).send({ message: `No existen mesas` })
        res.send(200, { mesas })
    })
}

function getMesa(req, res) {

    let mesaId = req.params.mesaId

    Mesa.findById(mesaId, (err, mesa) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!mesaId) return res.status(404).send({ message: `La mesa no existe` })
        res.status(200).send({ mesa })
    })
}

function updateMesa(req, res) {
    let mesaId = req.params.mesaId
    let update = req.body

    if (update.numeroMesa != null) {
        if (update.observacionMesa != null) {
            if (update.estadoMesa != null) {
                Mesa.findByIdAndUpdate(mesaId, update, (err, mesaUpdate) => {
                    if (err) {
                        return res.status(500).send({ message: `${err}` })
                    } else {
                        res.status(200).send({ mesa: mesaUpdate })
                    }
                })
            } else {
                res.status(300).send({ message: 'El estado de la mesa no puede estar vacío' })
            }
        } else {
            res.status(300).send({ message: 'La observación de la mesa no puede estar vacía' })
        }
    } else {
        res.status(300).send({ message: 'El número de mesa no puede estar vacío' })

    }
}

function deleteMesa(req, res) {
    let mesaId = req.params.mesaId
    Mesa.findById(mesaId, (err, mesa) => {
        if (err) return res.status(500).send({ message: `Error al borrar la mesa: ${err}` })
        mesa.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar la mesa: ${err}` })
            res.status(200).send({ message: `La mesa ha sido eliminada` })
        })
    })
}

module.exports = {
    getMesa,
    getMesas,
    saveMesa,
    updateMesa,
    deleteMesa
}