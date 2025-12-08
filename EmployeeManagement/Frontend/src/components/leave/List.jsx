import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'


const List = () => {
    const {user} = useAuth() ; 
    const [leaves,setLeaves] = useState([]) ; 

 const fetchLeave  = async ()=>{
      try {
           const response = await axios.get(`http://localhost:3000/api/leave/${user._id}`  , {
             headers : {authorization : `Bearers ${localStorage.getItem("token")}`}
           }) ; 
           if(response.data.success){
                setLeaves(response.data.leaves) ; 
           }
      } catch (error) {
     
      }
 }


  useEffect(()=>{
    fetchLeave() ; 
  },[]) ; 

  return (
     <div className='p-6'>
         <div className='text-center'>
             <h3 className='text-2xl font-bold'>Manage Leaves</h3>
         </div>
         <div className='flex justify-between items-center'>
            <input  
              type="text" 
              placeholder='Search previous leaves'
              className='px-4 py-0.5 border'  
            />
            <Link
              to="/employee-dashboard/add-leave"
              className='px-4 py-1 bg-teal-600 rounded text-white'
            >
              Add new Leave
            </Link>
         </div>

         
         {leaves.length>0 ? (
                     <table className='w-full text-sm text-left text-gray-500'>
                        <thead>
                          <tr>
                            <th className='px-6 py-3'>SNO</th>
                            <th className='px-6 py-3'>LEAVE TYPE</th>
                            <th className='px-6 py-3'>FROM</th>
                            <th className='px-6 py-3'>TO</th>
                            <th className='px-6 py-3'>DESCRIPTION</th>
                            <th className='px-6 py-3'>APPLIED DATE</th>
                            <th className='px-6 py-3'>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>

                          {leaves.map((leave,index)=>(
                              <tr 
                                key={leave.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '
                              >
                                 <td className='px-6 py-3'>{index+1}</td>
                                 <td className='px-6 py-3'>{leave.leaveType}</td>
                                 <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                                 <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                                 <td className='px-6 py-3'>{leave.reason}</td>  
                                 <td className='px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
                                 <td className='px-6 py-3'>{leave.status}</td>  
                              </tr>
                          ))}
                        </tbody>
                     </table>
                 ) : (<h1 className='my-5 text-red-600 font-bold text-5xl'>No Record found</h1>)}
    
     </div>
  )
}

export default List