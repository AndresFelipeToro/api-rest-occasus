'use strict'

const express = require('express')
const producto=require('../controllers/producto')
const usuario=require('../controllers/usuario')
const mesa=require('../controllers/mesa')
const pedido=require('../controllers/pedido')
const tmp=require('../controllers/tmp')
const itemPedido=require('../controllers/itemPedido')
const api = express.Router()
const auth = require('../middlewares/auth')

api.post('/mesa', auth, mesa.saveMesa)
api.get('/mesa', auth, mesa.getMesas)
api.get('/mesa/:mesaId', auth, mesa.getMesa)
api.put('/mesa/:mesaId', auth, mesa.updateMesa)
api.delete('/mesa/:mesaId', auth, mesa.deleteMesa)

api.post('/producto', auth, producto.saveProducto)
api.get('/producto', producto.getProductos)
api.get('/producto/:productoId', auth, producto.getProducto)
api.put('/producto/:productoId', auth, producto.updateProducto)
api.delete('/producto/:productoId', auth, producto.deleteProducto)

api.post('/tmp', auth, tmp.saveTmp)
api.get('/tmp/:tmpId', auth, tmp.getTmp)
api.delete('/tmp/:tmpId', auth, tmp.deleteTmp)

api.post('/pedido', auth, pedido.savePedido)
api.get('/pedido', auth, pedido.getPedidos)
api.get('/pedido/:pedidoId', auth, pedido.getPedido)
api.put('/pedido/:pedidoId', auth, pedido.updatePedido)
api.delete('/pedido/:pedidoId', auth, pedido.deletePedido)

api.post('/itemPedido', auth, itemPedido.saveItemPedido)
api.get('/itemPedido', auth, itemPedido.getItemPedidos)
api.get('/itemPedido/:itemPedidoId', auth, itemPedido.getItemPedido)
api.delete('/itemPedido/:itemPedidoId', auth, itemPedido.deleteItemPedido)


api.post('/usuario', usuario.saveUsuario)
api.get('/usuario', auth, usuario.getUsuarios)
api.get('/usuario/:usuarioId', auth, usuario.getUsuario)
api.put('/usuario/:usuarioId', auth, usuario.updateUsuario)
api.delete('/usuario/:usuarioId', auth, usuario.deleteUsuario)


api.post('/signIn', usuario.signIn)

module.exports = api

//realizado por Andrés