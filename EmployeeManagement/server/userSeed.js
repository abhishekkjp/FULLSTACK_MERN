const User = require('./models/Users') ; 
const bcrypt = require('bcrypt') ; 
const connectToDatabase = require('./db/db') ; 


const userRegister = async ()=>{
    connectToDatabase() ; 

    try {
         const hashPassword = await bcrypt.hash("admin" , 10) ; 
         const newUser = new User({
            name : "abhishek" , 
            email : "admin222@gmai.com" , 
            password : hashPassword , 
            role : "admin"
         }) ; 

         await newUser.save() ; 

         console.log('Good job') ; 
    } catch (error) {
        console.log(error) ; 
    }
}
userRegister() ; 

module.exports = userRegister ; 