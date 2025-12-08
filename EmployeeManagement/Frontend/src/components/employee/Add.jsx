import React, { useEffect, useState } from "react";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [departments , setDepartments] = useState([]) ; 
    const [formData,setFormData] = useState({}) ; 
    const navigate = useNavigate() ; 
    
  //  console.log(formData) ; 

    useEffect(()=>{
        const getDepartments = async ()=>{
         const   departMent =  await fetchDepartment() ; 
         setDepartments(departMent) ; 
        }
        getDepartments() ;  
    },[]) ; 


    const handleChange = (e)=>{
        const {name,value,files} = e.target ; 
       if(name==="image"){
          setFormData((prevData)=> ({...prevData , [name] : files[0]})) ;   
       }else{
           setFormData((prevData)=> ({...prevData , [name] : value})) ; 
       }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault() ; 
        const formDataObj  = new FormData() ; 
        Object.keys(formData).forEach((key)=>{
               formDataObj.append(key,formData[key]) ; 
        }) ;  
        try {
             const response = await axios.post("http://localhost:3000/api/employee/add" , formDataObj , {
                headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
             }) ; 


             if(response.data.success){
                navigate('/admin-dashboard/employees')
             }

        } catch (error) {
             if(error.response & !error.response.data.success){
                alert(error.response.data.error) ; 
             }
        }
    }



  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add new Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name  */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Insert name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* Gender */}
          <div>
            <lable className="block text-sm font-medium text-gray-700">
              Gender
            </lable>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
           >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
          </div>
          {/* Martial Status */}
          <div>
            <lable className="block text-sm font-medium text-gray-700">
              Martial Status
            </lable>
            <select
              name="martialStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
           >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          {/*Designation*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DESIGNATION
            </label>
            <input
              type="text"
              name="designation"
              placeholder="DESIGNATION"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* Department */}
          <div>
            <lable className="block text-sm font-medium text-gray-700">
              Department
            </lable>
            <select
              name="department"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {
                departments.map((dep)=>(
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>  
                ))
              }
            </select>
          </div>
          {/*Salary*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          {/* Role */}
          <div>
            <lable className="block text-sm font-medium text-gray-700">
              Role
            </lable>
            <select
              name="role"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* Upload image  */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
