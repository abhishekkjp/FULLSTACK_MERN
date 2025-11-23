const express = require('express') ; 
require("dotenv").config();
const cors = require('cors') ; 
const authRouter = require('./routes/auth') ; 
const connectToDatabase = require('./db/db') ;  





const app = express() ;
app.use(cors()) ; 
app.use(express.json()) ; 
const port = process.env.PORT || 5001 ; 
app.use('/api/auth' , authRouter) ; 


app.listen(port,()=>{
    connectToDatabase() ; 
    console.log(`server is running on port : ${port}`) ; 
})