const express = require('express') ; 
const cors = require('cors') ; 
const authRouter = require('./routes/auth') ; 
const noteRouter = require('./routes/note.js') ; 
const connectToMongoDB = require('./db/db.js') ; 


const PORT =  process.env.PORT || 5001 ; 
const app = express() ; 
app.use(cors()) ; 
app.use(express.json())
app.use('/api/auth' , authRouter) ; 
app.use('/api/note' , noteRouter) ; 





app.listen(PORT,()=>{
    connectToMongoDB() ; 
    console.log(`App is started on PORT ${PORT}`) ; 
})