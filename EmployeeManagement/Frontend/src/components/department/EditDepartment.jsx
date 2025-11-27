import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
    const {id} = useParams() ; 
    const navigate = useNavigate() ; 
    const [department,setDepartment] = useState({}) ; 
    const [loading ,setLoading] = useState(false) ; 

    useEffect(()=>{
        const fetchDepartment = async ()=>{
               setLoading(true)  ;
               try {
                   const response = await axios.get(`http://localhost:3000/api/department/${id}` , {
                      headers : {Authorization : `Bearers ${localStorage.getItem("token")}`}
                   }) ; 


            //    console.log(response) ; 
                 if(response.data.success){
                    setDepartment(response.data.department) ; 
                 }
                 setLoading(false) ; 

               } catch (error) {
                  if(error.response && !error.response.data.success){
                       alert(error.response.data.error) ; 
                  }
               }finally{
                setLoading(false) ; 
               }
        }

        fetchDepartment() ; 
    },[]) ; 


    const handleSubmit = async(e)=> {
         e.preventDefault() ;
         try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}` , department , {
                headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
            })
           console.log(response, 'i am here') ; 
            if(response.data.success){
                navigate('/admin-dashboard/departments') ; 
            }
           

         } catch (error) {
            
         }
    }




    const handleChange = (e)=>{
        const {name,value} = e.target ; 
        setDepartment({...department , [name] : value}) ; 
    }


    if(loading){
        return <div>Loading...</div>
    }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8  rounded-md shadow-md w-96">
    <div>
      <h2 className="text-2xl  font-bold mb-6">Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <lable
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department name
          </lable>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter dep. Name"
            value={department.dep_name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm  font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={department.description}
            onChange={handleChange}
            className="mt-1 p-2 block  w-full border border-gray-300  rounded-md"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
         Edit Department
        </button>
      </form>
    </div>

  </div>
  )
}

export default EditDepartment