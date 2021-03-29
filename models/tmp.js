const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productoId = require('../models/producto')

const TmpSchema = new Schema({
    idProducto:{type: Schema.Types.ObjectId, ref: "productoId"},
    cantidadTmp:{type:Number},
    precioTmp:{type:Number}
});


module.exports=mongoose.model('Tmp', TmpSchema);