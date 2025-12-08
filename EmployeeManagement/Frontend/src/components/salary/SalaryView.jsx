import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SalaryView = () => {
  const [salary,setSalaries] = useState(null) ;
  const [filteredSalaries,setFilteredSalaries] = useState(null) ; 
  const {id} = useParams() ; 
  let sno = 1 ; 
  
  const fetchSalaries = async ()=>{
     try {
       const response = await axios.get(`http://localhost:3000/api/salary/${id}` , {
         headers : {authorization : `Bearer ${localStorage.getItem("token")}`}
       })
      console.log(response.data) ; 
      if(response.data.success){
         setSalaries(response.data.salary) ;
         setFilteredSalaries(response.data.salary) ;  
      }
     } catch (error) {
         if(error.response && !error.response.data.success){
             alert(error.message) ; 
         }
     }
  }

  useEffect(()=>{
      fetchSalaries() ; 
  },[]) ; 



  // const filterSalaries = (e)=>{
  //     const fil = filterSalaries.filter((sal)=>  )
  // }



  return (
   <>
     {filteredSalaries ? (
           <div className='overflow-x-auto p-5'>
                 <div className='text-center'>
                   <h2 className='text-2xl font-bold'>Salary History</h2>
                 </div>
                 <div>
                   <input 
                     type="text" 
                     placeholder='Search By Emp Id'
                     className='border px-2 rounded-md py-0.5 border-gray-300'
                     />
                 </div>

                 {filteredSalaries.length>0 ? (
                     <table className='w-full text-sm text-left text-gray-500'>
                        <thead>
                          <tr>
                            <th className='px-6 py-3'>SNO</th>
                            <th className='px-6 py-3'>Emp ID</th>
                            <th className='px-6 py-3'>Salary</th>
                            <th className='px-6 py-3'>Allowance</th>
                            <th className='px-6 py-3'>Deduction</th>
                            <th className='px-6 py-3'>Total</th>
                            <th className='px-6 py-3'>PayDate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSalaries.map((salary)=>(
                              <tr 
                                key={salary.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '
                              >
                                 <td className='px-6 py-3'>{sno++}</td>
                                 <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                 <td className='px-6 py-3'>{salary.basicSalary}</td>
                                 <td className='px-6 py-3'>{salary.allowance}</td>
                                 <td className='px-6 py-3'>{salary.deduction}</td>
                                 <td className='px-6 py-3'>{salary.netSalary}</td>
                                 <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                              </tr>
                          ))}
                        </tbody>
                     </table>
                 ) : (<h1 className='my-5 text-red-600 font-bold text-5xl'>No Record found</h1>)}
           </div>
     ) : (<div>Loading...</div>)}
   </>
  )
}

export default SalaryView