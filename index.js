import express from 'express';
import session from 'express-session';
import cors from 'cors';

import db from './backend/config/database.js';
import routes from './backend/routes/routes.js';

import Carrera from './backend/models/Carrera.js';
import Usuario from './backend/models/Usuario.js';
import Materia from './backend/models/Materia.js';
import Profesor from './backend/models/Profesor.js';
import Alumno from './backend/models/Alumno.js';
import Asignacion_Materia from './backend/models/Asignacion_Materia.js';
import Calificacion from './backend/models/Calificacion.js';
import Grupo from './backend/models/Grupo.js';
import Periodo_Escolar from './backend/models/Periodo_Escolar.js';
import "./backend/models/relaciones.js";

const app = express();

app.use(cors({
    origin: 'https://controlescolar-1-dx30.onrender.com', // Reemplaza con la URL de tu frontend
    credentials: true // Permite enviar cookies con las solicitudes
}));
app.use(express.json());
app.use(express.static('dist'));
app.use(session({
    secret: 'controlEscolar',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));

app.use('/api', routes);

//Conexion a la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:');
        console.log(error);
    });

//Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:${port}`);
});

export default app;