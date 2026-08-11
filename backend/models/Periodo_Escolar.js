import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Periodo_Escolar = db.define('perido_escolar', {
    clave_pe :{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nombre_periodo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_inicio:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    tableName: 'periodo_escolar',
    timestamps: false
});

export default Periodo_Escolar;