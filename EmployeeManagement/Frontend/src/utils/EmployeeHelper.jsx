import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = () => [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px", 
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "130px", 
  },

  {
    name: "Image",
    cell: (row) => (
      <img
        src={`http://localhost:3000/uploads/${row.profileImage}`}
        className="w-12 h-12 rounded-full object-cover"
        alt="abhishek"
      />
      
    ),
    width: "100px", 
  } , 
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "100px", 
  },
  {
    name: "Dob",
    selector: (row) => row.dob,
    sortable: true,
    width: "200px", 
  },

  {
    name: "Action",
    cell: (row) => <EmployeeButtons _id={row._id} />,
    width: "300px", 
    center : true 
  },
];

export const fetchDepartment = async () => {
  let departments;
  try {
    //  console.log('inside it') ;
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    //  console.log('here also') ;
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response || error.response.data.success) {
      console.log(error.response.data.error);
    }
  }

  return departments;
};


// employee for salary form 
export const getEmployess = async (id)=>{
  let employess  ; 
    try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${id}` , {
          headers : {authorization : `Bearer ${localStorage.getItem("token")}`}
        })
       // console.log(response,'failing here') ; 
        if(response.data.success){
           employess = response.data.employees 
        }
    } catch (error) {
       if(error.response && !error.response.data.success){
        console.log('kumar desu') ; 
        alert(error.response.data.error) ; 
       }
    }

    return employess ; 
}




export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex  space-x-1">
      <button 
      className="px-4 py-2 shrink-0 bg-teal-600 text-white cursor-pointer"
           onClick={()=> navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
    </button>
      <button 
         className="px-4 py-2 shrink-0 bg-blue-600 text-white cursor-pointer"
        onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
         Edit
      </button>
      <button 
         className="px-4 py-2 shrink-0 bg-yellow-600 text-white cursor-pointer"
          onClick={()=> navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button className="px-4 py-2 shrink-0 bg-red-600 text-white cursor-pointer"
          onClick={()=> navigate()}
      > 
        Leave
      </button>
    </div>
  );
};
