const mongoose = require('mongoose') ; 
const {Schema} = mongoose ; 


const salaryScheme = new Schema({
    employeeId : {type : Schema.Types.ObjectId , ref:'Employee' , require:true} , 
    basicSalary : {type : Number , require:true} , 
    allowances : {type:Number} , 
    deductions : {type:Number} , 
    netSalary : {type:Number} , 
    payDate  : {type:Date , required:true} , 
    createdAt : {type:Date , default:Date.now} , 
    updatedAt : {type:Date,default:Date.now}
}) ; 



const Salary = mongoose.model('Salary',salaryScheme) ; 


module.exports = Salary