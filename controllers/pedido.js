var Pedido = require('../models/pedido')
var Mesa = require('../models/mesa')

function savePedido(req, res) {

    var pedido = new Pedido({

        datosMesa: req.body.datosMesa,
        fechaPedido: req.body.fechaPedido,
        costoPedido: req.body.costoPedido,
        estadoPedido: req.body.estadoPedido

    });

    if (pedido.datosMesa != null) {
        if (pedido.fechaPedido != null) {
            if (pedido.costoPedido >= 0) {
                if (pedido.estadoPedido != null) {
                    pedido.save((err, pedidoStored) => {
                        if (err) {
                            res.status(500).send({ message: `${err}`.slice(17) })
                        } else {
                            Mesa.populate(pedidoStored, { path: "datosMesa" }, function (err, pedidoStored) {
                                res.status(200).send({ pedido: pedidoStored })
                            })
                        }
                    })
                } else {
                    res.status(300).send({ message: 'El estado del pedido no puede estar vacío' })
                }
            } else {
                res.status(300).send({ message: 'El costo del pedido debe ser mayor a 0' })
            }
        } else {
            res.status(300).send({ message: 'La fecha del pedido no puede estar vacía' })
        }
    } else {
        res.status(300).send({ message: 'Los datos de la mesa deben ser válidos' })
    }
}

function getPedidos(req, res) {
    Pedido.find({}, (err, pedidos) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!pedidos) return res.status(404).send({ message: `No existen pedidos` })
        Mesa.populate(pedidos, { path: "datosMesa" }, function (err, pedidos) {
            res.send(200, { pedidos })
        })
    })
}

function getPedido(req, res) {

    let pedidoId = req.params.pedidoId

    Pedido.findById(pedidoId, (err, pedido) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!pedidoId) return res.status(404).send({ message: `El pedido no existe` })
        Mesa.populate(pedido, { path: "datosMesa" }, function (err, pedido) {
            res.status(200).send({ pedido })

        })
    })
}

function updatePedido(req, res) {

    let pedidoId = req.params.pedidoId
    let update = req.body

    if (update.datosMesa != null) {
        if (update.fechaPedido != null) {
            if (update.costoPedido >= 0) {
                if (update.estadoPedido != null) {
                    Pedido.findByIdAndUpdate(pedidoId, update, (err, pedidoUpdate) => {
                        if (err) {
                            return res.status(500).send({ message: `Error al actualizar el mantenimiento: ${err}` })
                        } else {
                            Mesa.populate(pedidoUpdate, { path: "datosMesa" }, function (err, pedidoUpdate) {
                                res.status(200).send({ pedido: pedidoUpdate })
                            })
                        }
                    })
                } else {
                    res.status(300).send({ message: 'El estado del pedido no puede estar vacío' })
                }
            } else {
                res.status(300).send({ message: 'El costo del pedido debe ser mayor a 0' })
            }
        } else {
            res.status(300).send({ message: 'La fecha del pedido no puede estar vacía' })
        }
    } else {
        res.status(300).send({ message: 'Los datos de la mesa deben ser válidos' })
    }
}

function deletePedido(req, res) {
    let pedidoId = req.params.pedidoId
    Pedido.findById(pedidoId, (err, pedido) => {
        if (err) return res.status(500).send({ message: `Error al borrar el pedido: ${err}` })
        pedido.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el pedido: ${err}` })
            res.status(200).send({ message: `El pedido ha sido eliminado` })
        })
    })
}


module.exports = {
    savePedido,
    getPedido,
    getPedidos,
    updatePedido,
    deletePedido
}