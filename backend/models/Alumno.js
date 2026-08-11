import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Alumno = db.define('alumno',{
    clave_a:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false  
    },
    clave_u:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    clave_c:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    clave_g:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    matricula: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    fecha_ingreso:{
        type: DataTypes.DATEONLY,
        allowNull:false
    }
},{
   tableName: 'alumno',
    timestamps: false 
});

export default Alumno;
