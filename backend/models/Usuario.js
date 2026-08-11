import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Usuario = db.define('Usuario', {
    clave_u: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    contrasena:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellidop:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellidom:{
        type: DataTypes.STRING,
        allowNull:false
    },
    telefono:{
        type: DataTypes.STRING
    },
     rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Alumno',
        validate: {
            isIn: [['Administrador', 'Profesor', 'Alumno']]
        }
    }
},{
    tableName:"usuario",
    timestamps:false
});

export default Usuario;