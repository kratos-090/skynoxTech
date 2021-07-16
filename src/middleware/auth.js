const jwt=require('jsonwebtoken');
const User=require('../models/users');

// auth middelware for authentication purpose
const auth=async(req,res,next)=>
{
    try {
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=jwt.verify(token,process.env.JWT_SECRET);//getting user id
        const user=await User.findOne({_id:decoded._id,'tokens.token':token});//finding user
        if(!user)
        {
            console.log('no user found');
            throw new Error();
            
        }
            
        req.token = token;//adding auth token to the req  
        req.user=user;//adding user to the req
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate properly"});
    }

}

module.exports=auth;