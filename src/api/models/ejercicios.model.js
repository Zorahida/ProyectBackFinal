//Modelo de Ejercicios de Fitness

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ejerciciosSchema = new Schema(
    {
        nombre: {type: String, required: true},
        musculos: {type: [String], required: true},
        dificultad: {type: String, required: true},
        repeticiones: {type: Number, required: true},
        series: {type: Number, required: true},
        video: {type: String, required: true},        
        descripcion: {type: String, required: true},
        tipo: {type: String, required: true}
    },{
        timestamps: true
    }
)

const Ejercicio = mongoose.model('Ejercicios', ejerciciosSchema);
module.exports = Ejercicio;