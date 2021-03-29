const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mesaId = require('../models/mesa')

const PedidoSchema = new Schema({
    datosMesa: { type: Schema.Types.ObjectId, ref: "mesaId", required: "Es necesario el dato de la mesa" },
    fechaPedido: { type: Date, default: Date.now, required: "La fecha de creación del pedido es necesaria" },
    costoPedido: { type: Number, required: "Es necesario el valor del pedido" },
    estadoPedido:{type:String, enum:['Pago', 'No Pago'], required:"Es necesario el estado del pedido"}
});


module.exports = mongoose.model('Pedido', PedidoSchema);