const { verifySign, closeSesion } = require('../utils/jwt');
const Usuario = require('../api/models/usuarios.model');

//un middleware es un bloque de código intermedio, que vamos a utilizar para que cuando el usuario me mande el token, primero se haga la verificación y luego ver si puede hacer uso de todas las routes

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // recoger la autorizacion enviada en el request, el token lo mando por headers
    if (!authorization) {
      return res.status(401).json({ message: 'No estás autorizado' });
    }

    const token = authorization.split(' ')[1];//de los 3 apartados del token, sólo me interesa el segundo apartado 

    if (!token) {
      return res.status(401).json({ message: 'No hay token, no estás autorizado' });
    }
    let tokenVerified = verifySign(token, process.env.JWT_KEY); // verificación del token -> que el token corresponde a uno que ha sido creado con el jwt

    if (!tokenVerified.id) {
      return res.status(401).json(tokenVerified);//si no existe el id del usuario, me va a devolver el error
    }
    console.log(tokenVerified);
    
    const userLogged = await Usuario.findById(tokenVerified.id); //este usuario quiero devolver para que le llegue a checkSession
    req.user = userLogged;//propiedad con toda la info del user

    next();//va a permitir que cuando vaya a usuariosBase y cumpla de forma correcta todos los pasos de las autorizaciones de los token, pueda ejecutar la función checkSession
  } catch (error) {
    return res.status(500).json(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    //recoger la autorizacion enviada en el request, el token lo mando por headers
    if (!authorization) {
      return res.status(401).json({ message: 'No estás autorizado' });
    }
    console.log(authorization);
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No hay token, no estás autorizado' });
    }
    let tokenVerified = verifySign(token, process.env.JWT_KEY); // verificar  nuestro token

    if (!tokenVerified.id) {
      return res.status(401).json(tokenVerified);
    }
    console.log(tokenVerified);
    const userLogged = await Usuario.findById(tokenVerified.id);

    if (userLogged.role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Para ver este apartado necesitas ser administrador' });
    }//Esta función solo se diferencia de isAuth por este if. Este if es propio para el administrador, introducimos el role. 

    req.user = userLogged;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};


module.exports = { isAuth, isAdmin };
