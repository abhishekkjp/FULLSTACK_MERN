import React, { useEffect, useState } from "react";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    martialStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartment = async () => {
      const departments = await fetchDepartment();
      setDepartments(departments);
    };
    getDepartment();
  }, []);

  console.log(employee);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({ ...prev, 
               name: employee?.userId?.name  ,
               martialStatus: employee.martialStatus,
               designation: employee.designation,
               salary: employee.salary,
               department: employee.department,
            }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          const response = await axios.put(`http://localhost:3000/api/employee/${id}` ,employee, {
            headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
          })
          console.log('here inside update') ; 
          if(response.data.success){
            navigate('/admin-dashboard/employees')
          }
    } catch (error) {
        alert("unable to update") ; 
    }
  };

  return (
    <>
      {employee && departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
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
                  value={employee?.name}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
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
                  value={employee.martialStatus}
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
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />
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
                  value={employee.salary}
                  required
                />
              </div>
              {/* Department */}
              <div className="col-span-2">
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
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
