//Fichero semilla para inicializar la base de datos en usuarios

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Usuario = require('../api/models/usuarios.model');
dotenv.config();

const arrayusuarios = [
  {
    username: 'user123',
    password: 'password123',
    correo: 'user123@example.com',
    nombre: 'Juan Pérez',
    peso: 70,
    objetivo: 65,
    altura: 175,
    edad: 30,
    genero: 'Masculino',
  },
  {
    username: 'fitness_girl',
    password: 'securepass456',
    correo: 'fitness_girl@mail.com',
    nombre: 'Laura Sánchez',
    peso: 55,
    objetivo: 60,
    altura: 160,
    edad: 25,
    genero: 'Femenino',
  },
  {
    username: 'gym_lover',
    password: 'strongpass789',
    correo: 'gym_lover@gmail.com',
    nombre: 'Alex Smith',
    peso: 85,
    objetivo: 80,
    altura: 180,
    edad: 28,
    genero: 'Masculino',
  },
  {
    username: 'fitgirl89',
    password: 'mypassword123',
    correo: 'fitgirl89@mail.com',
    nombre: 'Carla Gutierrez',
    peso: 62,
    objetivo: 58,
    altura: 165,
    edad: 32,
    genero: 'Femenino',
  },
  {
    username: 'strongman',
    password: 'pass1234',
    correo: 'strongman@gmail.com',
    nombre: 'Michael Johnson',
    peso: 100,
    objetivo: 110,
    altura: 190,
    edad: 35,
    genero: 'Masculino',
  },
  {
    username: 'active_lady',
    password: 'activepass567',
    correo: 'active_lady@mail.com',
    nombre: 'Sara Davis',
    peso: 58,
    objetivo: 62,
    altura: 158,
    edad: 27,
    genero: 'Femenino',
  },
];

const seedUsuarios = async () => {
  try {
    const DBURL1 = process.env.DBURL;
    await mongoose.connect(DBURL1);

    const allUsuarios = await Usuario.find();
    if (allUsuarios.length > 0) {
      await Usuario.collection.drop();
      console.log("Usuarios borrados");
    }

    for (const usuario of arrayusuarios) {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      usuario.password = hashedPassword;
    }

    const UsuariosMap = arrayusuarios.map((usuario) => new Usuario(usuario));
    await Usuario.insertMany(UsuariosMap);
    console.log("Usuarios insertados");
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      mongoose.disconnect();
    }
};

seedUsuarios();


