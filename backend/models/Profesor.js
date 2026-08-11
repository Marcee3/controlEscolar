import {DataTypes} from 'sequelize';
import db from './../config/database.js';

const Profesor = db.define('profesor', {
    clave_p:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    clave_u:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    especialidad:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'profesor',
    timestamps: false
});

export default Profesor;