const mongoose = require('mongoose') ; 

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/notes_app") ;  
        console.log('mongoose connected') ; 
    } catch (error) {
        console.log('error connection mongodb' , error.message) ; 
    }
}

module.exports = connectToMongoDB ; 