//Fichero de conexion a la base de datos

const mongoose = require("mongoose");

const DBURL1 = process.env.DBURL;

const connect = async () =>{   
    
    try {
        const db = await mongoose.connect(DBURL1, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        const {name, host} = db.connection
        console.log(`Base de datos : ${name} y host: ${host}`)
    }catch (error){console.log(error)}
}

module.exports = {connect};