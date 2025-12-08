const express = require('express')  ; 
const authMiddleware = require('../middleware/authMiddleware') ; 
const {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDepId} = require('../controllers/employeeController') ; 
//const { fetchDepartment } = require('../../Frontend/src/utils/EmployeeHelper');


const router = express.Router()   ; 


router.post('/add' ,authMiddleware,upload.single("image") ,  addEmployee) ; 
router.get('/',authMiddleware,getEmployees) ; 
router.get('/:id',authMiddleware,getEmployee)
router.put('/:id' ,authMiddleware,updateEmployee) ; 
router.get('/department/:id' , authMiddleware,fetchEmployeeByDepId) ; 

module.exports = router ; 

