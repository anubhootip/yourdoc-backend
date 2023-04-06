const db = require('./services/db');
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = verify.result[0]
        console.log(req.user);
        next();
    } catch (error) {
       return next(error); 
    }
}

  module.exports = isAuthenticated;