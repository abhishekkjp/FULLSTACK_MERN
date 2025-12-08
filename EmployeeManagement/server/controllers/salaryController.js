const Salary = require("../models/Salary");


const addSalary = async (req, res) => {
    try {
        console.log('salary add') ; 
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
        
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save() ; 
        return res.status(200).json({success:true}) ; 
    } catch (error) {
         return res.staus(500).json({success:false , error:"Server error at Salary addition"}) ; 
    }
}
const getSalaryById = async(req,res)=>{
    try {
        const {id} = req.params  ; 
        const salary = await Salary.find({employeeId:id}).populate('employeeId' , 'employeeId') ;
        return res.status(200).json({success:true , salary}) ; 

    } catch (error) {
        return res.staus(500).json({success:false , error:"Server error at Salary addition"}) ; 
   }
}



module.exports = { addSalary ,getSalaryById}; 
