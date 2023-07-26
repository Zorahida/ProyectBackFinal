//Fichero de rutas de los usuarios

const express = require('express');
const {loginUser, getAllUsuarios, setNewUsuario, updateUsuario, deleteUsuario, getUsuarioMail, adminRole, checkSession } = require('../controllers/usuarios.controller');

const { isAdmin, isAuth } = require('../../middlewares/auth');

const router = express.Router();

router.get("/", getAllUsuarios)

router.post("/newUser", setNewUsuario)

router.post("/login", loginUser);

router.put("/upUser/:id", updateUsuario)

router.delete("/delUser/:id", deleteUsuario)

router.get("/getUserMail/:correo", getUsuarioMail)

router.post('/admin', [isAdmin], adminRole);

router.post("/checksession", [isAuth], checkSession); //ruta protegida -> si no pasa la prueba del token, no va a poder acceder a checkSession



module.exports = router;

