import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";


const List = () => {
     const [employees,setEmployees] = useState([])  ; 
     const [empLoading,setEmpLoading] = useState(false) ;
     const [filteredData,setFiltered] = useState([]) ;  


     useEffect(()=>{
          const fetchEmployees = async ()=>{
            setEmpLoading(true)  ; 
            try {
                const response = await axios.get('http://localhost:3000/api/employee' , {
                    headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
                })
                console.log('backend works fine') ; 
                if(response.data.success){
                    let sno = 1 ; 
                    const data = response.data.employees.map((emp)=>({
                        _id : emp._id , 
                        sno : sno++ ,
                        dep_name : emp.department.dep_name , 
                        name : emp.userId?.name , 
                        dob : new Date(emp.dob).toLocaleDateString() , 
                        profileImage : emp.userId?.profileImage , 
                        //action : (<EmployeeButtons _id={emp._id}/>) 
                    }
                )) ; 
                    setEmployees(data) ; 
                    setFiltered(data) ; 
                }
                setEmpLoading(false) ; 
            } catch (error) {
                setEmpLoading(false) ; 
                console.log('unable to load the data from backend ') ;  
                alert(error) ; 
            }
                
          }
          fetchEmployees() ;  
     },[]) ; 
   
    // console.log(employees) ; 

     const handleFilter = (e)=>{
          const data = employees.filter((emp)=> (
              emp.dep_name.toLowerCase().includes(e.target.value.toLowerCase()) 
          )) ; 
          
         // console.log(data) ; 
          setFiltered(data) ; 
     }


     
        if(empLoading){
         return <div>Loading....</div>
        }


  return (
    <>
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Employee</h3>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Employee"
            className="border px-4 py-0.5 "
            onChange={handleFilter}
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add new Employee
          </Link>
        </div>
        <div className="overflow-x-auto w-full mt-6">
            <DataTable columns={columns()} data={filteredData} pagination/>
        </div>
      </div>
    </>
  );
};

export default List;
