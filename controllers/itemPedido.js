var ItemPedido = require('../models/itemPedido')
var Producto = require('../models/producto')
var Pedido = require('../models/pedido')
var Tmp = require('../models/tmp')

var Precio;
var SumaPedido = 0;

function saveItemPedido(req, res) {

    var itemPedido = new ItemPedido({
        pedidoItem: req.body.pedidoItem,
        productoItem: req.body.productoItem,
        cantidadItem: req.body.cantidadItem
    });

    Producto.findOne(itemPedido.productoItem, (err, producto) => {
        if (producto.estadoProducto == 'Inactivo') {
            return res.status(300).send({ message: 'No se pueden asignar un pedido a un Producto Inactivo' })
        } else {
            if (itemPedido.pedidoItem != null) {
                if (itemPedido.cantidadItem >= 1) {
                    if (itemPedido.productoItem != null) {
                        itemPedido.valorItemPedido = producto.costoProducto * itemPedido.cantidadItem
                        SumaPedido = SumaPedido + itemPedido.valorItemPedido
                        Pedido.findById(itemPedido.pedidoItem, (err, pedidoUpdate) => {
                            if (err) {
                                return res.status(500).send({ message: `${err}` })
                            } else {
                                pedidoUpdate.costoPedido=SumaPedido
                                pedidoUpdate.save()
                            }
                        })

                        itemPedido.save((err, itemPedidoStored) => {
                            if (err) {
                                res.status(500).send({ message: `${err}`.slice(17) })
                            } else {
                                Producto.populate(itemPedidoStored, { path: "productoItem", select: ["nombreProducto", "lineaProducto"] }, function (err, itemPedidoStored) {
                                    Pedido.populate(itemPedidoStored, { path: "pedidoItem" }, function (err, itemPedidoStored) {
                                        res.status(200).send({ itemPedido: itemPedidoStored })
                                    })
                                })
                            }
                        })
                    } else {
                        res.status(300).send({ message: 'El producto no debe ser vacío' })
                    }
                } else {
                    res.status(300).send({ message: 'La cantidad no puede ser menor a cero' })
                }
            } else {
                res.status(300).send({ message: 'El pedido no puede estar vacío' })
            }

        }
    })

}



function getItemPedidos(req, res) {
    ItemPedido.find({}, (err, items) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!items) return res.status(404).send({ message: `No existen pedidos` })
        Pedido.populate(items, { path: "pedidoItem", select: "datosMesa" }, function (err, items) {
            Producto.populate(items, { path: "productoItem", select: ["nombreProducto", "lineaProducto"] }, function (err, items) {
                res.send(200, { items })
            })
        })
    })
}

function getItemPedido(req, res) {
    let itemPedidoId = req.params.itemPedidoId
    ItemPedido.findById(itemPedidoId, (err, item) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!itemPedidoId) return res.status(404).send({ message: `El pedido no existe` })
        Pedido.populate(item, { path: "pedidoItem", select: "datosMesa" }, function (err, item) {
            Producto.populate(item, { path: "productoItem", select: ["nombreProducto", "lineaProducto"] }, function (err, item) {
                res.status(200).send({ item })
            })
        })
    })
}

function updateViaje(req, res) {

    let viajeId = req.params.viajeId
    let update = req.body

    if (update.precioViaje >= 1200000 || update.precioViaje == null) {
        if (update.numeroPlanilla > 0 || update.numeroPlanilla == null) {
            Viaje.findByIdAndUpdate(viajeId, update, (err, viajeUpdate) => {
                if (err) {
                    return res.status(500).send({ message: `Error al actualizar el viaje: ${err}` })
                } else {


                    Usuario.populate(viajeUpdate, { path: "conductor", select: ["documento", "nombreCompleto", "estado"] }, function (err, viajeUpdate) {
                        Tractocamion.populate(viajeUpdate, { path: "placaTractocamion", select: "placa" }, function (err, viajeUpdate) {
                            res.status(200).send({ viaje: viajeUpdate })
                        })
                    })
                }
            })

        } else {
            res.status(300).send({ message: 'El número de planilla deber estar conformado por números positivos' })
        }
    } else {
        res.status(300).send({ message: 'El precio del viaje no debe ser inerior a $1.200.000' })
    }

}


function deleteItemPedido(req, res) {

    let itemPedidoId = req.params.itemPedidoId
    ItemPedido.findById(itemPedidoId, (err, pedido) => {
        if (err) return res.status(500).send({ message: `Error al borrar el item: ${err}` })
        pedido.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el item: ${err}` })
            res.status(200).send({ message: `El Item ha sido eliminado` })
        })
    })
}

module.exports = {
    getItemPedidos,
    getItemPedido,
    saveItemPedido,
    deleteItemPedido
}