import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Asignacion_Materia = db.define('asignacion_materia',{
    clave_asig:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    clave_p:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    clave_m:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    clave_g:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'asignacion_materia',
    timestamps: false
});

export default Asignacion_Materia;