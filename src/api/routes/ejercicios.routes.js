//Fichero de rutas

const express = require('express');
const {getAllEjercicios, setNewEjercicio, updateEjercicio, deleteEjercicio} = require('../controllers/ejercicios.controller');
const router = express.Router();

router.get("/", getAllEjercicios)

router.post("/newEj", setNewEjercicio)

router.put("/upEj/:id", updateEjercicio)

router.delete("/delEj/:id", deleteEjercicio)



module.exports = router;