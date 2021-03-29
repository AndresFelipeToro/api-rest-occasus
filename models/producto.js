const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombreProducto: { type: String, required: "Es necesaria el nombre del Producto" },
    lineaProducto: { type: String, enum: ['Michelada', 'Bebida', 'Combinada', 'Licor', 'Otros gustos'], required: "Es necesario la línea de Producto" },
    existencia_inicial: { type: Number, min: 1, required: "Es necesaria la existencia inicial" },
    existencia_actual: { type: Number, min: 1},
    costoProducto: { type: Number, required: "Es necesario el costo del producto" },
    estadoProducto: { type: String, enum: ['Activo', 'Inactivo'], required: "Es necesario el estado del producto" }
});


module.exports = mongoose.model('Producto', ProductoSchema);