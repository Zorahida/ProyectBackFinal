//Llamadas a paquetes instalados

const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();
const {connect} = require("./src/utils/database")

//Elementos necesarios para establecer la conexion a la base de datos
const app = express()
const PORT = process.env.PORT || 5000
connect()
app.use(cors())
app.use(express.json())

const routerFitness = require("./src/api/routes/ejercicios.routes")
const routerUsuarios = require("./src/api/routes/usuarios.routes") 

app.use("/fitnessBase", routerFitness)
app.use("/usuariosBase", routerUsuarios)

app.listen(PORT, ()=>{
    console.log(`Server URL: http://localhost:${PORT}`)
})