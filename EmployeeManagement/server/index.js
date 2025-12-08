const express = require('express') ; 
require("dotenv").config();
const cors = require('cors') ; 
const authRouter = require('./routes/auth') ; 
const departmentRouter = require('./routes/department') ; 
const employeeRouter = require('./routes/employee') ; 
const salaryRouter = require('./routes/salary') ; 
const leaveRouter = require('./routes/leave') ; 
const connectToDatabase = require('./db/db') ;  





const app = express() ;
app.use(cors()) ; 
app.use(express.json()) ; 
const port = process.env.PORT || 5000 ; 
app.use('/uploads' , express.static('public/uploads')) ; 
app.use('/api/auth' , authRouter) ; 
app.use('/api/department' , departmentRouter) ; 
app.use('/api/employee' , employeeRouter) ; 
app.use('/api/salary' ,salaryRouter) ; 
app.use('/api/leave' , leaveRouter) ; 


app.listen(port,()=>{
    connectToDatabase() ; 
    console.log(`server is running on port : ${port}`) ; 
})