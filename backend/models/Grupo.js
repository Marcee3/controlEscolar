import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Grupo = db.define('grupo',{
    clave_g:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false  
    },
    clave_c:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    grado: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    letra:{
        type: DataTypes.STRING,
        allowNull:false
    },
    clave_pe:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'grupo',
    timestamps: false
});

export default Grupo;