import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Carrera = db.define('carrera', {
    clave_c:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        nombre_c:{
            type:DataTypes.STRING,
            allowNull:false
        },
        duracion:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
}, {
    tableName: 'carrera',
    timestamps: false
});

export default Carrera;