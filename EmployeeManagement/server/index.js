const express = require('express') ; 
const cors = require('cors') ; 
const authRouter = require('./routes/auth') ; 

const app = express() ;
app.use(cors()) ; 
app.use(express.json()) ; 
const port = process.env.PORT || 5001 ; 
app.use('/api/auth' , authRouter) ; 

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`) ; 
})