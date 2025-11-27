import { useNavigate } from "react-router-dom";

const columns  = [
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
        selector : (row)=> row.action
    }
] ; 

const DepartmentButtons = ({_id})=>{
     const navigate = useNavigate() ; 
    return (
        <div className="flex space-x-3">
            <button className="px-4 py-2 bg-teal-600 text-white cursor-pointer" onClick={()=> navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="px-4 py-2 bg-red-600 text-white cursor-pointer">Delete</button>
        </div>
    )
}
export  {columns,DepartmentButtons} ; 