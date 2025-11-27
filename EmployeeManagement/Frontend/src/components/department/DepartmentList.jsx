import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  //console.log('help me ') ;
  useEffect(() => {
  //  console.log("useEffect is running ");
    setLoading(true);
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
       // console.log(response);
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons _id={dep._id}/>
          }));
          setDepartments(data);
        }
      } catch (error) {
        setLoading(false);
        if (error.response || !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Department"
          className="border px-4 py-0.5 "
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add new Department
        </Link>
      </div>
      {departments.length>0 && 
       <div className="mt-5">
         <DataTable columns={columns} data={departments} />
       </div>
     
      }
    </div>
  );
};

export default DepartmentList;
