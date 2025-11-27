const express = require('express') ; 
const authMiddleware = require('../middleware/authMiddleware') ; 
const {addDepartment,getDepartments,editDepartment,updateDepartment} = require('../controllers/departmentController') ; 
const router = express.Router() ; 


router.post('/add' ,authMiddleware,  addDepartment) ; 
router.get('/' ,authMiddleware, getDepartments)  ; 
router.get('/:id' , authMiddleware,editDepartment) ; 
router.put('/:id' , authMiddleware,updateDepartment)  ; 


module.exports = router  ; 