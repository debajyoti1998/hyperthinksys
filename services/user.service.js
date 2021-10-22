const User = require("../models/user.model");
const { DbError } = require("../utils/error");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const removeSecretFromUser = (obj) =>{
  const {password, createdAt,updatedAt ,isDeleted , ...returnData} = obj
  return returnData;
}


const addUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ where: { email: userData.email , isDeleted: false } });
    if (existingUser){
      throw new Error("user already exists");
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      userData.password = bcrypt.hashSync(userData.password, salt);
      const newUser = await User.create(userData);
      return removeSecretFromUser(newUser.dataValues);
    } 
  } catch (err) {
    console.log(err);
    throw new DbError(err.message);
  }
};


const LoginUser = async ({email,password}) => {
  
  const userDate = await User.findOne({ where: { email:email , isDeleted: false} });
  if (userDate && userDate.dataValues) {
    const DbUserData = userDate.dataValues
    const status = bcrypt.compareSync(password, DbUserData.password);
    if (status) {
     return removeSecretFromUser(DbUserData) ;
    } else {
      throw new Error("user password not matched");
    }
  } else {
    throw new Error("user not exists");
  }
};

async function getUserData(id){
  try {
    const user = await User.findByPk(id);
    if (user === null && user.dataValues.isDeleted == false) {
      throw new Error("user not exists");
    } else {
      return removeSecretFromUser(user.dataValues)
    }
  }
  catch (err) {
    console.log(err);
    throw new DbError(err.message);
  }
}

async function updateUserName(id,u_name){
  try {
    const user = await User.findByPk(id);
    if (user === null || user.isDeleted == true){
      throw new DbError("user not found");
    }
    else{
      user.name = u_name;
      const newdata =  await user.save();
      return removeSecretFromUser(newdata.dataValues)
    }
  }
  catch (err) {
    console.log(err);
    throw new DbError(err.message);
  }
}

async function deleteUser(id){
  try {
    const user = await User.findByPk(id);
    if (user === null || user.isDeleted == true ){
      throw new DbError("user not found");
    }
    else{
      user.isDeleted = true;
      const newdata =  await user.save();
      if(newdata.isDeleted) {
        return true
      }
      return false
    }
  }
  catch (err) {
    console.log(err);
    throw new DbError(err.message);
  }
} 


module.exports = {addUser,LoginUser,getUserData,updateUserName,deleteUser};
