const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MesaSchema = new Schema({
    numeroMesa:{type:String, required:"Es necesario el nombre de la mesa", unique: true},
    observacionMesa:{type:String, required:"Es necesaria la descripción de la mesa"},
    estadoMesa:{type:String, enum:['Libre', 'Ocupada'], required:"Es necesario el estado de la mesa"}
});


module.exports=mongoose.model('Mesa', MesaSchema);