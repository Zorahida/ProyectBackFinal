//Modelo de Usuarioss de Fitness

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema(
    {
        
    },{
        timestamps: true
    }
)

const Usuarios = mongoose.model('usuarios', usuariosSchema);
module.exports = Usuarios;