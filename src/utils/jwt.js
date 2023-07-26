//npm i jsonwebtoken para instalar la dependencia y poder crear los token desde 0
//jwt-> libreria para generar el token -> JSON Web Token (JWT) es un estándar para transmitir información de forma segura en internet, por medio de archivos en formato JSON
//un token es un código que contiene un conjunto de información y que valida que el inicio de sesión realizado ha sido correcto

//Importar la librería JWT
const jwt = require("jsonwebtoken");

//1ª Clave(variable de entorno) que me va a permitir trabajar con JWT, tenemos que intentar que sea muy larga, con números y caracteres especiales. Este va a ser mi valor para crear ese token y firmarlo -> lo creo yo
//Debería ir en el fichero .env

//2º Función para crear el token
const generateSign = (id, correo)=>{
return jwt.sign({id, correo}, process.env.JWT_KEY, {expiresIn:"1h"}) //gnerar un token o firma basado en el id y correo que reciba como parámetro
//expiresIn: parámetro opcional -> tiempo de expiración. Pasado este tiempo, tienes que volverte a loggear porque el token ya no es válido
}

//3º Función para comprobar que el token sea correcto
const verifySign = (token, JWT_KEY)=>{
return jwt.verify(token, JWT_KEY)
//comprobar el token en base al nuestro
}


module.exports = {generateSign, verifySign}