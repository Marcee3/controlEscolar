import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Calificacion = db.define('calificacion',{
    clave_cf:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 
    },
    clave_a:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    clave_asig:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    parcial_1: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    parcial_2: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    parcial_3: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    },
    promedio_final:{
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
    }
},{
    tableName: 'calificacion',
    timestamps: false
});

export default Calificacion;