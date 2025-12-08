const path = require('path');
const Employee = require('../models/Employee');
const User = require('../models/Users');
const Department = require('../models/Department') ; 
const bcrypt = require('bcrypt') ; 
const multer = require('multer') ; 


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"public/uploads") ; 
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
}) ; 

const upload = multer({storage:storage}) ; 



const addEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, dob, gender, martialStatus, designation, department, salary, password, role } = req.body;
        const user = await User.findOne({email})  ; 
        if(user){
            return res.status(400).json({success:false , error:"User already exist in emp"}) ; 
        }
        const hashPassword = await bcrypt.hash(password,10) ;
       // console.log('i will add the employee') ; 
    const  newUser = new User({
         name,
         email,
         password:hashPassword ,
         role,
         profileImage : req.file ? req.file.filename : "" , 
    }) ;  
   const savedUser =  await newUser.save() ; 
    // save the employee data
    const newEmployee  = new Employee({
         userId : savedUser._id , 
         employeeId , 
         dob,
         gender , 
         martialStatus , 
         designation , 
         department , 
         salary
    }) ; 
    newEmployee.save() ;       
    return res.status(200).json({success:true  , message : 'Employe Created'})  
    } catch (error) {
        return res.status(500).json({success:false , error:'Server Error while adding employee' }) ; 
    }
}
const getEmployees = async(req,res)=>{
    console.log('will give you some data') ; 
     try {
         const employees  = await Employee.find().populate('userId' , {password:0}).populate('department') ; 
         res.status(200).json({success:true, employees}) ;  
     } catch (error) {
        res.status(500).json({success:false , error : 'Fetch employee server Error'}) ; 
     }
}

const getEmployee = async(req,res)=>{
   try {
       const {id} = req.params ; 
       let  employee = await Employee.findById({_id:id}).populate('userId' , {password:0}).populate("department") ;  
       if(!employee){
           employee = await Employee.findOne({userId:id}).populate("userId" , {password:0}).populate("department") ; 
       }
       return res.status(200).json({success:true , employee}) ; 
   } catch (error) {

    return res.status(500).json({success:false , error : 'Server error employee with given id is not found'}) ; 
    
   }
}
const updateEmployee = async(req,res)=>{
    try {
        const {id}  =req.params ; 
        const { name,  martialStatus, designation, department, salary } = req.body;
        const employee = await Employee.findById({_id:id}) ;
        if(!employee){
            return res.status(404).json({success:false , error : 'Employee not found'}) ; 
            
        } 
        const user = await User.findById({_id:employee.userId}) ; 
        if(!user){
            return res.status(404).json({success:false , error : 'user not found'}) ; 
        }
        const updateUser = await User.findByIdAndUpdate({_id:employee.userId} , {name}) ; 
        const updateEmployee = await Employee.findByIdAndUpdate({_id:id} , {martialStatus, designation, department, salary }) ; 
        // console.log('update') ; 
        // console.log(updateEmployee,updateUser) ; 

         if(!updateEmployee || !updateUser){
            return res.status(404).json({success:false, error:"Document not found "}) ; 
         }

         return res.status(200).json({success:true , message : "employee Updated"}) ; 


    } catch (error) {
        return res.status(500).json({success:false , error : 'server sider error cant update'}) ; 
    }
}
const fetchEmployeeByDepId = async(req,res)=>{
    const {id} = req.params ; 
   // console.log('we are here') ; 
        try {
         const employees  = await Employee.find({department:id}) ;
         console.log(employees) ; 
         return res.status(200).json({success:true , employees}) ;  
    } catch (error) {
        return res.status(500).json({success:false , error:"cant fetch employee by Depid . "}) ; 
    }
}


module.exports = { addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDepId}; 