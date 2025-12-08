const express = require('express') ; 
const authMiddleware = require('../middleware/authMiddleware') ; 
const {addSalary,getSalaryById} = require('../controllers/salaryController')  ; 

const router = express.Router() ;

router.post('/add' , authMiddleware ,addSalary) ; 
router.get('/:id',authMiddleware,getSalaryById) ; 
// router.get('/:id' ,authMiddleware,get)



module.exports = router ; 


