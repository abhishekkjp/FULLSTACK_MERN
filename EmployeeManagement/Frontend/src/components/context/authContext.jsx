import axios from 'axios';
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const userContext = createContext() ; 

const AuthContext = ({children}) => {
      const [user,setUser] = useState(null) ; 
      const [loading,setLoading] = useState(false) ; 
 
      const navigate = useNavigate() ; 

      useEffect(()=>{
            const verifyUser = async ()=>{
                setLoading(true) ; 
                try {

                     const token = localStorage.getItem('token') ; 
                  //   console.log(token) ; 
                     if(!token){
                        navigate('/login') ; 
                        return  ; 
                     }
                     const response = await axios.get('http://localhost:3000/api/auth/verify' , 
                         {headers : {"Authorization" : `Bearer ${token}`}}
                     ) ; 
                    // console.log(response) ; 
                     if(response.data.success){
                          setUser(response.data.user) ; 
                          setLoading(false) ; 
                     }
                 } catch (error) {
                        console.log("abhishek is here") ; 
                        setLoading(false) ; 
                         navigate('/login') ; 
                 }
            } ; 

            verifyUser() ; 
      },[]) ; 


      const login = async (user)=>{
            setUser(user) ; 
      }
      const logout = async ()=>{
           setUser(null) ; 
           localStorage.removeItem('token') ; 
      }



  return (
       <userContext.Provider value={{user, loading ,  login,logout}}>
             {children}
       </userContext.Provider>
  )
}

export const useAuth = ()=> useContext(userContext) ; 
export default AuthContext