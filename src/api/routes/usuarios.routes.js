//Fichero de rutas de los usuarios

const express = require('express');
const {getAllUsuarios, setNewUsuario, updateUsuario, deleteUsuario} = require('../controllers/usuarios.controller');
const router = express.Router();

router.get("/", getAllUsuarios)

router.post("/newUser", setNewUsuario)

router.put("/upUser/:id", updateUsuario)

router.delete("/delUser/:id", deleteUsuario)



module.exports = router;