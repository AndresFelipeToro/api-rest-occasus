var Producto = require('../models/producto')

function saveProducto(req, res) {

    var producto = new Producto({
        nombreProducto: req.body.nombreProducto,
        lineaProducto: req.body.lineaProducto,
        existencia_inicial: req.body.existencia_inicial,
        costoProducto: req.body.costoProducto,
        estadoProducto: req.body.estadoProducto
    });

    if (producto.costoProducto > 0) {
        if (producto.existencia_inicial >= 1) {
            if (producto.lineaProducto != null) {
                if (producto.nombreProducto != null) {
                    if (producto.estadoProducto != null) {
                        producto.existencia_actual=producto.existencia_inicial
                        producto.save((err, productoStored) => {
                            if (err) {
                                res.status(500).send({ message: `${err}`.slice(17) })
                            } else {
                                res.status(200).send({ producto: productoStored })
                            }
                        })
                    } else {
                        res.status(300).send({ message: 'El estado del producto no puede estar vacío' })
                    }
                } else {
                    res.status(300).send({ message: 'El nombre del Producto no puede estar vacío' })
                }
            } else {
                res.status(300).send({ message: 'La línea de Producto no puede estar vacío' })

            }
        } else {
            res.status(300).send({ message: 'La existencia inicial no debe ser menor a cero' })
        }
    } else {
        res.status(300).send({ message: 'El costo del producto no debe ser menor o igual a cero' })
    }
}

function getProductos(req, res) {
    Producto.find({}, (err, productos) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!productos) return res.status(404).send({ message: `No existen tractocamiones` })
        res.send(200, { productos })
    })
}

function getProducto(req, res) {

    let productoId = req.params.productoId

    Producto.findById(productoId, (err, producto) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!productoId) return res.status(404).send({ message: `El tractocamión no existe` })

        res.status(200).send({ producto })

    })
}

function updateProducto(req, res) {
    let productoId = req.params.productoId
    let update = req.body
    if (update.costoProducto > 0) {
        if (update.existencia_inicial >= 1) {
            if (update.lineaProducto != null) {
                if (update.nombreProducto != null) {
                    if (update.estadoProducto != null) {
                        update.existencia_actual=update.existencia_inicial
                        Producto.findByIdAndUpdate(productoId, update, (err, productoUpdate) => {
                            if (err) {
                                return res.status(500).send({ message: `${err}` })
                            } else {
                                res.status(200).send({ producto: productoUpdate })
                            }
                        })
                    } else {
                        res.status(300).send({ message: 'El estado del producto no puede estar vacío' })
                    }
                } else {
                    res.status(300).send({ message: 'El nombre del Producto no puede estar vacío' })
                }
            } else {
                res.status(300).send({ message: 'La línea de Producto no puede estar vacío' })

            }
        } else {
            res.status(300).send({ message: 'La existencia inicial no debe ser menor a cero' })
        }
    } else {
        res.status(300).send({ message: 'El costo del producto no debe ser menor o igual a cero' })
    }
}

function deleteProducto(req, res) {
    let productoId = req.params.productoId
    Producto.findById(productoId, (err, producto) => {
        if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })
        producto.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })
            res.status(200).send({ message: `El producto ha sido eliminado` })
        })
    })
}

module.exports = {
    getProducto,
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto
}