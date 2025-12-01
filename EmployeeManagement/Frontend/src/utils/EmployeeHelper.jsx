import axios from 'axios'


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
