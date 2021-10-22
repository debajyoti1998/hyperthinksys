require("dotenv").config();
const db = require('./sequelize.init');
const User = require('../models/user.model')
const sequelize = db();


const initiate = async()=>{
  try{
    const result = await sequelize.sync({force:true});
    console.log(result)
  }
  catch(err){
    console.log("error happen");
    console.log(err)
  }
}

initiate();

