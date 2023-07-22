const Ejercicio = require("../models/ejercicios.model");

//Devuelve los ejercicios
const getAllEjercicios = async(req, res) =>{
    try{
        const allEjercicios = await Ejercicio.find()
        return res.json(allEjercicios)
    }catch(error){
        console.log(error);
    }
};

//Añadir ejercicio
const setNewEjercicio = async(req, res) => {
    try{
        const newEjercicio = new Ejercicio(req.body);
        const createdEjercicio = await newEjercicio.save();
        try {
            console.log("Datos recibidos:", req.body); // Agrega esta línea para verificar los datos recibidos
            // Resto del código para guardar el ejercicio...
        } catch (error) {
            // Manejo de errores...
        }
        return res.status(200).json(createdEjercicio);        
        
    }catch(error) {
        return res.status(500).json(error)
    }
}
//Update de ejercicio
const updateEjercicio = async(req, res) =>{
    try{
        const {id} = req.params
        // console.log(id)
        const updateEjercicio = new Ejercicio(req.body)
        updateEjercicio._id = id;
        const updateEj = await Ejercicio.findByIdAndUpdate(id, updateEjercicio, {new: true});
        return res.status(200).json(updateEj)
    }catch (error){
        return res.status(500).json(error)

    }
}
//Delete de ejercicio
const deleteEjercicio = async(req, res) =>{
    try {
        const {id} = req.params
        const deleteEj = await Ejercicio.findByIdAndDelete(id);
        if(!deleteEj){
            return res.status(404).json({message: "Ejercicio no encontrado"})
        }
        return res.status(200).json(deleteEj)
    }catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {getAllEjercicios, setNewEjercicio, updateEjercicio, deleteEjercicio};