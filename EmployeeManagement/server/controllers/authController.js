const User = require('../models/Users') ; 




const login = async (req,res)=>{
   try {
        const {email,password} = req.body ; 
        const user = await User.findOne({email}) ; 
   } catch (error) {
      console.log(error) ; 
   }
}

module.exports =  {login} ; 