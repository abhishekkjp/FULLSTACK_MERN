const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware.js');


const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ success: false, message: 'User already exist' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    return res.status(200).json({ success: true, message: "Account Successfully created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Cannot add user" });
  }


})
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: `User doesn't exist` });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    // if password is different 
    if (!checkpassword) {
      return res.status(401).json({ success: false, message: `wrong password` });
    }

    // generate jwt token 
    // we pass 3 parameters(payload,secret key , expiry time) ; 
    const token = jwt.sign({ id: user._id }, "abhisecretkey@222", { expiresIn: '1h' });





    return res.status(200).json({ success: true, token, user: { name: user.name }, message: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in Login" });
  }

})
router.get('/verify'  ,async (req,res)=>{
    // console.log('verify successfully') ; 
    return res.status(200).json({success:true , user:req.user}) ; 
})



module.exports = router 