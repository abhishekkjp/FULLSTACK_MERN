const Employee = require('../models/Employee');
const Leave = require('../models/Leave');

const addLeave = async (req,res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        //console.log(req.body) ; 
        const employee = await Employee.findOne({userId}) ; 
        //console.log(employee) ; 

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save() ; 
        //console.log('about to save') ; 
        return res.status(200).json({success:true}) ; 
    } catch (error) {
       return res.status(500).json({success:false , error : "leave add server error"}) ; 
    }
}
const getLeave = async (req,res)=>{
    try {
        const {id} = req.params ; 
        const employee = await Employee.findOne({userId:id}) ; 
        const leaves = await Leave.find({employeeId:employee._id}) ; 
     return res.status(200).json({success:true , leaves}) ; 
  } catch (error) {
     return res.status(500).json({success:false , error:'leave add server error'}) ; 
  }
}



module.exports = {addLeave,getLeave}; 