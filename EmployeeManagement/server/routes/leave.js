const express = require('express') ; 
const authMiddleware = require('../middleware/authMiddleware') ; 
const {addLeave,getLeave} = require('../controllers/leaveController') ; 
const router = express.Router() ; 




router.post('/add' , authMiddleware , addLeave) ; 
router.get('/:id',authMiddleware,getLeave) ; 




module.exports = router  ; 