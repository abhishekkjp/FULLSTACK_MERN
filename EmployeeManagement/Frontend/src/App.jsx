import React from 'react'
import {Route,Routes,BrowserRouter,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashBoard from './pages/AdminDashBoard'


const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/admin-dashboard'/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashBoard/>}></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App