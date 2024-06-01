import { sequelizeInstance } from "../connection.js";
import { DataTypes, ForeignKeyConstraintError } from "sequelize";
import { User } from "./user.model.js";

export const Post = sequelizeInstance.define('Post',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isDeleted:{
        type: DataTypes.ENUM('true', 'false'),
        defaultValue: 'false',
        allowNull: false 
    }
},{
    timestamps:true
});


Post.belongsTo(User, {as: 'User.id',foreignKey: 'author',onDelete:'CASCADE',onUpdate:'CASCADE'});
User.hasMany(Post,{as: 'User.id',foreignKey: 'author'});

