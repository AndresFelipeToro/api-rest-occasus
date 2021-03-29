var Tmp = require('../models/tmp')

function saveTmp(req, res) {

    var tmp = new Tmp({
        idProducto: req.body.idProducto,
        cantidadTmp: req.body.cantidadTmp,
        precioTmp: req.body.precioTmp
    });


    tmp.save((err, tmpStored) => {
        if (err) {
            res.status(500).send({ message: `${err}`.slice(17) })
        } else {
            res.status(200).send({ tmp: tmpStored })
        }
    })
}


function getTmp(req, res) {

    let tmpId = req.params.tmpId

    Tmp.findById(tmpId, (err, tmp) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!tmpId) return res.status(404).send({ message: `Tmp no existe` })
        res.status(200).send({ tmp })
    })
}

function deleteTmp(req, res) {
    let tmpId = req.params.tmpId
    Tmp.findById(mesaId, (err, tmp) => {
        if (err) return res.status(500).send({ message: `Error al borrar tmp: ${err}` })
        tmp.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar tmp: ${err}` })
            res.status(200).send({ message: `Tmp ha sido eliminado` })
        })
    })
}

module.exports = {
    getTmp,
    saveTmp,
    deleteTmp
}