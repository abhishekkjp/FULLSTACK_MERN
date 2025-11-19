const express = require('express') ; 
const Note = require('../models/Notes') ; 
const middleware = require('../middleware/middleware') ; 
//const { findByIdAndUpdate } = require('../models/user');

const router = express.Router() ; 



router.post('/add' ,middleware, (req,res)=>{
       try {
           const {title,description} = req.body  ; 
           const newNote = new Note({
             title , 
             description , 
             userId : req.user.id 
           })
           newNote.save() ; 

           return res.status(200).json({success:true , message:"Notes created Successfull"}) ; 
       } catch (error) {
        return res.status(500).json({success:false , message:"Error adding notes"}) ; 

       }
}) ;
router.get('/' ,middleware,async (req,res)=>{
    console.log(req.user.id) ; 
      try {
           const notes = await Note.find() ; 
           return res.status(200).json({success:true , notes})
      } catch (error) {
         console.log('failing here') ; 
        return res.status(500).json({success:false,message:'cant retrive notes'})
      }
})
router.put('/:id' , async (req,res)=>{
     try {
        const {id} = req.params ; 
        const updateNote = await Note.findByIdAndUpdate(id,req.body,{new:true}) ; 
        return res.status(200).json({success:true , updateNote}) ; 
     } catch (error) {
        return res.status(500).json({success:false,message:'cant update note'})
     }
})
router.delete('/:id' , async (req,res)=>{
      try {
        const {id} = req.params ; 
        const updateNote = await Note.findByIdAndDelete(id) ; 
        return res.status(200).json({success:true,updateNote}) ; 
      } catch (error) {
        return res.status(500).json({success:false, message:'cant delete'}) ; 
      }

}) ; 


module.exports = router 



