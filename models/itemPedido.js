const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pedidoId = require('../models/pedido')
const productoId = require('../models/producto')

const ItemPedidoSchema = new Schema({
    pedidoItem: { type: Schema.Types.ObjectId, ref: "pedidoId", required: "Es necesario el dato del pedido" },
    productoItem: { type: Schema.Types.ObjectId, ref: "productoId", required: "Es necesario el dato del producto" },
    cantidadItem: { type: Number, required: "Es necesaria la cantidad" },
    valorItemPedido: { type: Number}
});


module.exports = mongoose.model('ItemPedido', ItemPedidoSchema);