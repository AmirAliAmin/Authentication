import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

export default function RefreshHandle({setIsAuthenicated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenicated(true);
            if (location.pathname === "/" || location.pathname === "/login") {
                navigate('/home', replace(false));
            }
        }
    },[location,navigate,setIsAuthenicated])
  return (
    null
  )
}
