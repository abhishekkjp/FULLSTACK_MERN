const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // check if user exist 
      const user = await User.findOne({ email });
      if (!user) {
       return   res.status(404).json({ success: false, message: 'User not found ' });
      }

      // compare the password 
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return  res.status(404).json({ success: false, message: 'Wrong password' });
      }
      // generate token 
      const token =  jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "10d" })
       console.log(token) ; 
      res
         .status(200)
         .json({ success: true, token, user: { _id: user._id, name: user.name, role: user.role } });
   } catch (error) {
     res.status(500).json({success:false , error : error.message}) ; 
   }
}


const verify = async (req,res) =>{
   console.log('here') ; 
   return res.status(200).json({success:true,user:req.user}) ; 
}

module.exports = { login ,verify }; 