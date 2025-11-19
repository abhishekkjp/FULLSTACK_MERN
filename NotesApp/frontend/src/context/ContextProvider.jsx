import React, { createContext, useState ,useContext, useEffect } from 'react'
import axios from 'axios';

const authContext = createContext() ; 

const ContextProvider = ({children}) => {
 const [user,setUser] = useState(null) ; 

 const login = (user)=>{
     setUser(user) ; 
 }
 const handleLogout = () => {
    setUser(null) ; 
    localStorage.removeItem("token") ; 
 };

 useEffect( async ()=>{
   const verify = async ()=>{
    try {
        const res = await axios('http://localhost:5001/api/auth/verify' ,
          {headers : {Authorization: `Bearer ${localStorage.getItem("token")}` }}) ; 
       
        if(res.data.success){
           setUser(res.data.user) ; 
           console.log(res.data.user) ; 
        }else{
           setUser(null) ; 
        }
    } catch (error) {
       console.log(error) ; 
    }
   }
   verify() ; 

   return ()=> AbortController() ; 
 },[])  ; 



  return (
      <authContext.Provider value={{user , login ,handleLogout}}>
          {children}
      </authContext.Provider>
  )
}
export const useAuth = ()=> useContext(authContext) ; 
export default ContextProvider