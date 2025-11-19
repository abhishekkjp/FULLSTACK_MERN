const jwt = require('jsonwebtoken') ; 
const User = require('../models/user') ; 




const middleware = async(req,res,next)=>{
     // console.log('we are here') ; 
       try {
         console.log('ggod') ; 
          const token = req.headers.authorization.split(' ')[1] ; 
          console.log('we are here') ; 
          if(!token){
            return res.status(401).json({success:false , message:"Unauthorized"}) ; 
          }

         const decoded = jwt.verify(token,"abhisecretkey@222") ; 
         
         if(!decoded){
            return res.status(401).json({success:false , message:"Invalid token"}) ; 
         }
        
         const user = await User.findById(decoded.id) ; 

         if(!user){
            return res.status(404).json({success:false , message:"User not found"}) ; 
         }

         const newUser = {name:user.name , id:user._id} ; 
         req.user = newUser ; 
         
         next() ; 
       } catch (error) {
        return res.status(500).json({success:false , message:"Please login"}) ; 
       }
}


module.exports  = middleware ; 