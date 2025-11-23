import React from 'react'
import { useAuth } from '../components/context/authContext'

const EmployeeDashBoard = () => {
    const {user} = useAuth() ; 
  return (
    <div>the hardworking employee is {user}</div>
  )
}

export default EmployeeDashBoard