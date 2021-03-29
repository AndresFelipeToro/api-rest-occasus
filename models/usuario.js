const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UsuarioSchema = new Schema({

    nombreCompleto: { type: String, required: "Es necesario el nombre del usuario" },
    correo: { type: String, required: "Es necesario el correo del usuario", unique: true, lowercase: true },
    contrasenia: { type: String, required: "Es necesaria la contraseña del usuario" },
    estado: { type: String, enum: ['Activo', 'Inactivo'], required: "Es necesario el estado del usuario" },
    fechaCreacion: { type: Date, default: Date.now, required: "La fecha de creación del usuario es necesaria" },
});

UsuarioSchema.pre('save', function (next) {
     bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.contrasenia, salt, null, (err, hash) => {
            if (err) return next(err)
            this.contrasenia = hash
            next()
        })
    })
})


UsuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.contrasenia, (err, isMatch) => {
        cb(err, isMatch)
    });
}

module.exports = mongoose.model('Usuario', UsuarioSchema);