import { sequelizeInstance } from "../connection.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";

export const Comment = sequelizeInstance.define('Comment',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
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

User.hasMany(Comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
Comment.belongsTo(User);
Post.hasMany(Comment,{onDelete:'CASCADE',onUpdate:'CASCADE'});
Comment.belongsTo(Post);
