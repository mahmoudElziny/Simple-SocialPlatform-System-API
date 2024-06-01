import { Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize('simple_facebook','root','',{
    host:'localhost',
    dialect:'mysql'
});

export const db_connection = async ()=>{
    try {
        await sequelizeInstance.sync({alter: true , force: false});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

