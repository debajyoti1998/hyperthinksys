// require('dotenv').config()
const Sequelize = require('sequelize');
let sequelize = null;
const DB =()=>{
  try{
    if(sequelize){
      return sequelize;
    }
    else{
      sequelize = new Sequelize( process.env.POSTGRES_DB, process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD, { host: process.env.POSTGRES_HOST, port: process.env.POSTGRES_PORT, dialect:'postgres' });
      if(sequelize){
        console.log("connected to DB")
        return sequelize
      }
      else{
        console.log("DB connection error")
      }
      
    }
  }
  catch(err){
    console.log("DB connection error")
    return null;
  }
}
 
module.exports = DB