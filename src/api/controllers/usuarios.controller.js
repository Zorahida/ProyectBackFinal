const Usuario = require("../models/usuarios.model");
const bcrypt = require('bcrypt');
const { generateSign } = require("../../utils/jwt");


const loginUser = async (req, res) => {
    try {
      const userInfo = await Usuario.findOne({ correo: req.body.correo });
      if (!userInfo) {
        return res.status(404).json({ message: "El email es incorrecto" });
      }
      //Buscamos en la BD con findOne, que va a devolver un solo objeto/valor, el usuario al que corresponde el email del formulario
      
      if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
        return res.status(400).json({ message: "La contraseña es incorrecta" });
      }
      //.comparesync -> compara si lo que escribió el usuario coincide con lo que me ha devuelto la BD cuando he buscado con ese findOne

          //generar un token
    const token = generateSign(userInfo.id, userInfo.correo);

    return res.status(200).json({token, userInfo}); 
    // me devuelve la info del token y del usuario
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Devuelve los usuarios
const getAllUsuarios = async(req, res) =>{
    try{
        const allUsuarios = await Usuario.find()
        return res.json(allUsuarios)
    }catch(error){
        console.log(error);
    }
};

//Añadir usuario
const setNewUsuario = async(req, res) => {
    try{
        const newUsuario = new Usuario(req.body);
        const createdUsuario = await newUsuario.save();
        try {
            console.log("Datos recibidos:", req.body); // Agrega esta línea para verificar los datos recibidos
            // Resto del código para guardar el usuario...
        } catch (error) {
            // Manejo de errores...
        }
        return res.status(200).json(createdUsuario);        
        
    }catch(error) {
        return res.status(500).json(error)
    }
}
//Update de usuario
const updateUsuario = async(req, res) =>{
    try{
        const {id} = req.params
        // console.log(id)
        const updateUsuario = new Usuario(req.body)
        updateUsuario._id = id;
        updateUsuario.password = req.body.password;
        if (updateUsuario.password) {
            // Si la contraseña se envía en la solicitud, encriptarla antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(updateUsuario.password, 10);
            updateUsuario.password = hashedPassword
        }
        const updateUser = await Usuario.findByIdAndUpdate(id, updateUsuario, {new: true});
        return res.status(200).json(updateUser)
    }catch (error){
        return res.status(500).json(error)

    }
}
//Delete de usuario
const deleteUsuario = async(req, res) =>{
    try {
        const {id} = req.params
        const deleteUser = await Usuario.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message: "Usuario no encontrado"})
        }
        return res.status(200).json(deleteUser)
    }catch (error) {
        return res.status(500).json(error)
    }
}

const getUsuarioMail = async(req, res)=>{
    try{
        const {correo} = req.params
        const userCorreo = await Usuario.findOne({ correo: correo });
        return res.status(200).json(userCorreo)
    }catch(error){
        console.log(error)
    }
}

const adminRole = async (req, res) => {
    try {
      res.status(200).json({
        user: req.user,
        message: 'Eres administrador',
        role: req.user.role,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const checkSession = async(req,res) => {
    try {
res.status(200).json(req.user); //devuelve la info del usario logado desde auth.js - isAuth
    }catch{
        return res.status(500).json(error);
    }
  }


module.exports = { loginUser, getAllUsuarios, setNewUsuario, updateUsuario, deleteUsuario, getUsuarioMail, adminRole, checkSession };