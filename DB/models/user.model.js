import { sequelizeInstance } from "../connection.js";
import { DataTypes } from "sequelize";

export const User = sequelizeInstance.define('User',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    loggedIn:{
        type: DataTypes.ENUM('true', 'false'),
        defaultValue: 'false',
        allowNull: false 
    }
},{
    timestamps:true,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});