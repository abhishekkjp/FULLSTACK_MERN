import { useNavigate } from "react-router-dom";
import axios from "axios";

export const  columns  = (onDepartmentDelete)=> [
    {
        name : "S No" , 
        selector : (row)=> row.sno 
    },
    {
        name : "Department Name" , 
        selector : (row)=> row.dep_name  
    },
    {
        name : "Action" , 
        cell : (row)=> (
            <DepartmentButtons
               _id={row._id}
               onDepartmentDelete={onDepartmentDelete}
            />
        )
    }
] ; 




export const DepartmentButtons = ({_id,onDepartmentDelete})=>{
     const navigate = useNavigate() ; 


     const handleDelete =  async (Id)=>{
       const confirm = window.confirm("Do you want to delete ?") ; 
       
       if(confirm){
           try {
            
                const response = await axios.delete(`http://localhost:3000/api/department/${Id}` , {
                   headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
                }) ; 
            
           // console.log('handle dep is running successfully') ; 
             if(response.data.success){
                onDepartmentDelete(Id) ; 
             }
           } catch (error) {
             if(error.response && !error.response.data.success){
                 alert(error.response.data.error) ; 
             }
           }
       }
     }


    return (
        <div className="flex space-x-3">
            <button className="px-4 py-2 bg-teal-600 text-white cursor-pointer" onClick={()=> navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="px-4 py-2 bg-red-600 text-white cursor-pointer" onClick={()=> handleDelete(_id)}>Delete</button>
        </div>
    )
}
