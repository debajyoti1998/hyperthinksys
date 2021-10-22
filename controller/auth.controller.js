const catchAsync=require('../utils/catchAsyncError')
const {addUser,LoginUser,getUserData,updateUserName,deleteUser}=require("../services/user.service")
const {createAccessToken}= require("../middlewares/jwt/index")

const getUserStatus= catchAsync( async (req, res) => {
    const user= await getUserData(res.locals.user.id)
    res.status(200).send({ success: 1 , user : user});
})

const registerController= catchAsync( async (req, res) => {
    const user=await addUser(req.body)
    res.status(200).send({ success: 1 , user : user});
})


const loginController =catchAsync(async (req, res) => {
    const userLogin=await LoginUser(req.body)
    console.log(userLogin)
    const accessToken = createAccessToken(userLogin)
    res.cookie('jwt',accessToken,{httponly:true}).send({ success:1 , user: userLogin });
}) 

const updateuser =catchAsync(async (req, res) => {
    const user_id = req.params.uid
    const userLogin=await updateUserName(user_id,req.body.name)
    res.status(200).send({ success: 1 , user : userLogin}); 
}) 

const deleteuser =catchAsync(async (req, res) => {
    const user_id = req.params.uid
    const userLogin=await deleteUser(user_id)
    res.status(200).send({ success: 1 , deleteStatus : userLogin});  
})


module.exports = {
    registerController,
    loginController,
    getUserStatus,
    loginController,
    updateuser,
    deleteuser
};