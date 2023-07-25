//Fichero semilla para inicializar la base de datos en ejercicios

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ejercicio = require('../api/models/ejercicios.model');
dotenv.config();

const arrayejercicios = [
  {
    nombre: 'Flexiones de pecho',
    musculos: ['Pectorales', 'Tríceps'],
    dificultad: 'Intermedio',
    repeticiones: 15,
    series: 3,
    video: 'https://www.youtube.com/embed/IODxDxX7oi4',
    descripcion: 'Ejercicio para fortalecer el pecho y tríceps.',
    tipo: 'Pecho',
  },
  {
    nombre: 'Sentadillas',
    musculos: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    dificultad: 'Principiante',
    repeticiones: 12,
    series: 4,
    video: 'https://www.youtube.com/embed/QKKZ9AGYTi4',
    descripcion: 'Ejercicio para fortalecer las piernas.',
    tipo: 'Piernas',
  },
  {
    nombre: 'Dominadas',
    musculos: ['Espalda', 'Bíceps'],
    dificultad: 'Avanzado',
    repeticiones: 8,
    series: 4,
    video: 'https://www.youtube.com/embed/eGo4IYlbE5g',
    descripcion: 'Ejercicio para fortalecer la espalda y bíceps.',
    tipo: 'Espalda',
  },
  {
    nombre: 'Burpees',
    musculos: ['Cuerpo completo'],
    dificultad: 'Intermedio',
    repeticiones: 10,
    series: 3,
    video: 'https://www.youtube.com/embed/JZQA08SlJnM',
    descripcion: 'Ejercicio cardiovascular y de cuerpo completo.',
    tipo: 'Cardio',
  },
  {
    nombre: 'Plancha',
    musculos: ['Abdominales', 'Core'],
    dificultad: 'Principiante',
    repeticiones: 30,
    series: 3,
    video: 'https://www.youtube.com/embed/ASdvN_XEl_c',
    descripcion: 'Ejercicio para fortalecer el core y abdominales.',
    tipo: 'Core',
  },
  {
    nombre: 'Zancadas',
    musculos: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    dificultad: 'Intermedio',
    repeticiones: 12,
    series: 3,
    video: 'https://www.youtube.com/embed/VeWPohDurqk',
    descripcion: 'Ejercicio para fortalecer las piernas.',
    tipo: 'Piernas',
  },
  {
    nombre: 'Flexiones de tríceps',
    musculos: ['Tríceps'],
    dificultad: 'Principiante',
    repeticiones: 10,
    series: 3,
    video: 'https://www.youtube.com/embed/3swstXwLJRc',
    descripcion: 'Ejercicio para fortalecer los tríceps.',
    tipo: 'Brazos',
  },
  {
    nombre: 'Skipping',
    musculos: ['Cardiovascular'],
    dificultad: 'Principiante',
    repeticiones: 30,
    series: 3,
    video: 'https://www.youtube.com/embed/PY4l9jqkuP4',
    descripcion: 'Ejercicio cardiovascular para quemar calorías.',
    tipo: 'Cardio',
  },
  {
    nombre: 'Mountain climbers',
    musculos: ['Abdominales', 'Cardiovascular'],
    dificultad: 'Intermedio',
    repeticiones: 20,
    series: 3,
    video: 'https://www.youtube.com/embed/nmwgirgXLYM',
    descripcion: 'Ejercicio para trabajar el core y cardio.',
    tipo: 'Cardio',
  },
  {
    nombre: 'Elevaciones de talones',
    musculos: ['Gemelos'],
    dificultad: 'Principiante',
    repeticiones: 15,
    series: 3,
    video: 'https://www.youtube.com/embed/Npn-Zej7Q1s',
    descripcion: 'Ejercicio para fortalecer los gemelos.',
    tipo: 'Piernas',
  },
  {
    nombre: 'Fondos de tríceps',
    musculos: ['Tríceps'],
    dificultad: 'Intermedio',
    repeticiones: 12,
    series: 3,
    video: 'https://www.youtube.com/embed/2z8JmcrW-As',
    descripcion: 'Ejercicio para fortalecer los tríceps.',
    tipo: 'Brazos',
  },
  {
    nombre: 'Saltos con cuerda',
    musculos: ['Cardiovascular'],
    dificultad: 'Principiante',
    repeticiones: 50,
    series: 3,
    video: 'https://www.youtube.com/embed/zvhRGF_G_64',
    descripcion: 'Ejercicio cardiovascular y de coordinación.',
    tipo: 'Cardio',
  },
  {
    nombre: 'Flexiones diamante',
    musculos: ['Pectorales', 'Tríceps'],
    dificultad: 'Intermedio',
    repeticiones: 12,
    series: 3,
    video: 'https://www.youtube.com/embed/ITe43DiSvrE',
    descripcion: 'Ejercicio para trabajar pectorales y tríceps.',
    tipo: 'Pecho',
  },
  {
    nombre: 'Elevaciones laterales',
    musculos: ['Hombros'],
    dificultad: 'Principiante',
    repeticiones: 10,
    series: 3,
    video: 'https://www.youtube.com/embed/hgLpdwMtEEs',
    descripcion: 'Ejercicio para trabajar los hombros.',
    tipo: 'Espalda',
  },
  {
    nombre: 'Plancha lateral',
    musculos: ['Oblicuos', 'Core'],
    dificultad: 'Intermedio',
    repeticiones: 30,
    series: 2,
    video: 'https://www.youtube.com/embed/zfiOU4yxLKo',
    descripcion: 'Ejercicio para trabajar los oblicuos y core.',
    tipo: 'Core',
  },
];


const DBURL1 = process.env.DBURL
mongoose.connect(DBURL1)
.then(async () => {
const allEjercicios = await Ejercicio.find();
if(allEjercicios.length > 0){
    await Ejercicio.collection.drop()
    console.log("Ejercicios borrados")
}
})
.catch((error) => console.log(`error borrando ejercicios: ${error}`))
.then(async() => {
    const EjerciciosMap = arrayejercicios.map(ejercicio => new Ejercicio(ejercicio));
    await Ejercicio.insertMany(EjerciciosMap);
    console.log("ejercicios insertados")
})
.catch((error) => console.log(`error insertando ejercicios: ${error}`))
.finally(()=>mongoose.disconnect());
