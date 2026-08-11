import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Materia = db.define('materia', {
    clave_m:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    clave_c:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nombre_m:{
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinacion:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'materia',
    timestamps: false
});

export default Materia;