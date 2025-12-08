import React, { useEffect, useState } from "react";
import { fetchDepartment, getEmployess } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployess] = useState([]);
  const navigate = useNavigate();
//   const { id } = useParams();

  useEffect(() => {
    const getDepartment = async () => {
      const departments = await fetchDepartment();
      setDepartments(departments);
    };
    getDepartment();
  }, []);

  //console.log(employee);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/employee/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           const employee = response.data.employee;
//           setEmployee((prev) => ({
//             ...prev,
//             name: employee?.userId?.name,
//             martialStatus: employee.martialStatus,
//             designation: employee.designation,
//             salary: employee.salary,
//             department: employee.department,
//           }));
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     };
//     fetchEmployee();
//   }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("here inside update");
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert("unable to add the salary details");
    }
  };
  const handleDepartment = async (e) => {
    console.log(e.target.value) ; 
    const emps = await getEmployess(e.target.value);
    setEmployess(emps);
  };

  return (
    <>
      { departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <lable className="block text-sm font-medium text-gray-700">
                  Department
                </lable>
                <select
                  name="department"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleDepartment}
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

              {/* Employee */}
              <div >
                <lable className="block text-sm font-medium text-gray-700">
                  Employees
                </lable>
                 {
            <select
                name="employeeId"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
                required
            >

                <option value="">Select Employees</option>
                {employees.length >0  &&  employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                </option>
                ))}
            </select>

                 }
              
              </div>

              {/*BAsic salary*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="BASIC SALARY"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>
              {/*Salary*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="allowance"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              {/*Deductions*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="Deduction"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              {/*Pay Date*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Add Salary
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

export default Add;
