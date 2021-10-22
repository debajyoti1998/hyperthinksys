
const  jwt = require('jsonwebtoken');

function createAccessToken(data){
    if(data && process.env.JWT_ACCESS_EXPIRY && process.env.JWT_SECRET ){
        const expiry_time = Math.floor(Date.now() / 1000) + (parseInt(process.env.JWT_ACCESS_EXPIRY) * 60)
        
        return jwt.sign( {exp: expiry_time,data: data} , process.env.JWT_SECRET);
    }
    else{
        throw new Error('data ,Expiry time and secret madetory for JWT');

    }
    
}


function verifyToken(token){
    try {
        const JwtData = jwt.verify(token, process.env.JWT_SECRET); 
        return JwtData.data;   
    } catch(err) {
        throw new Error('JWT not valid');
    }
}


function JWTmiddleware(req, res, next) {
    try{
        const token = (req.cookies && req.cookies.jwt) ? req.cookies.jwt : null ;
        if(token){
            const userdata = verifyToken(token)
            // res.locals :: share value between 2 middleware
            res.locals.user = userdata;
            next();
        }
        else{
            res.status(401).send({ status: 'Auth failed', time: new Date().getTime() });
        } 
    }
    catch(err) {
        // console.log(err)
        res.status(401).send({ status: 'Auth failed', time: new Date().getTime() });
    }
        
};

module.exports= {createAccessToken  , JWTmiddleware}
