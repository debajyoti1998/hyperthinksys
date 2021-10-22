require("dotenv").config();
const https = require('https');
const fs = require('fs');
const express=require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser');  
const DB =require('./database/sequelize.init');
const {NotFound}=require("./utils/error")

/**
  * middleware
**/
DB();

/**
  * middleware
**/

const app=express()
var corsOptions = {
  origin: "https://localhost:3000",
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());   //bodyparser : old
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/**
  * routes
**/
app.get('/', async function(req,res){
  res.send({status:"ping"})
});
app.use('/v1',require('./routes/v1'))

app.use((req, res, next) => {
  next(new NotFound('URL or method not found'));
});

app.use(require('./middlewares/handleErrors'));

/**
  * running server with HTTPS
**/
const PORT=process.env.PORT || 8000
const options = {
  key: fs.readFileSync('./cert/key.pem'), // Replace with the path to your key
  cert: fs.readFileSync('./cert/cert.pem') // Replace with the path to your certificate
}
https.createServer(options, app).listen(PORT,() => {
    console.log(`server started : https://localhost:${PORT}`);
});
