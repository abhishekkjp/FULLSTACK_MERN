const Department = require('../models/Department') ; 

const addDepartment = async (req,res)=>{
      try {
        const {dep_name,description} = req.body ; 
      //  console.log(dep_name,description) ; 
        const newDep = new Department({dep_name,description}) ;
        await newDep.save() ; 
        return res.status(200).json({success:true, department:newDep}) ; 
      } catch (error) {
        return res.status(500).json({success:false , error:"add department Server side error"}) ; 
      }
}
const getDepartments = async(req,res)=>{
    try {
       const departments  = await Department.find() ; 
      // console.log(departments) ; 
       return res.status(200).json({success:true , departments}) ; 
   } catch (error) {
     return res.status(500).json({success:false , error:"Unable to fetch departments"}) ; 
   } 
}
const editDepartment = async(req,res)=>{
    try {
         const {id} = req.params ;
         const department = await Department.findById({_id:id}) ;  
         return res.status(200).json({success:true , department}) ; 
    } catch (error) {
         return res.status(500).json({success:false,error:'No department found with this data'}) ; 
    }
}
const updateDepartment = async(req,res)=>{
    return res.status(200).json({success:true}) ; 
}


module.exports = {addDepartment,getDepartments,editDepartment,updateDepartment} ; 