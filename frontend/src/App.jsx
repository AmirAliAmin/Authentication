import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RefreshHandle from './pages/RefreshHandle';

export default function App() {
  const [isAuthenicated, setIsAuthenicated] = useState(false);

  const PrivateRoutes = ({element})=>{
    return isAuthenicated ?element : <Navigate to={'/login'}/>
  }
  return (
    <div>
      <RefreshHandle setIsAuthenicated={setIsAuthenicated}/>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<PrivateRoutes element={<Home/>}/>}/>
      </Routes>
    </div>
  )
}