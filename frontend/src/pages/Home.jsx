import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const [loggedUser, setLoggedUser] = useState('');
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  const fetchProduct = async () => {
    try {
      const url = 'http://localhost:5000/products'
      const headers ={
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      }
      const responce = await fetch(url, headers);
      const result = await responce.json()
      // console.log(result)
      setProducts(result)
    } catch (error) {
        toast.error("Network error.");
        console.error('Error:', error);
    }
    
  }
  useEffect(()=>{
    fetchProduct();
  },[])
  useEffect(()=>{
    setLoggedUser(localStorage.getItem("currentUser"))
  },[])
  return (
    <div className='bg-black h-screen flex items-center text-white justify-center flex-col '>
      <h1 className='text-5xl font-extrabold uppercase'>{loggedUser}</h1>
      <button className='mt-6 rounded-lg font-medium py-2 px-7 bg-purple-600 cursor-pointer hover:scale-110 transition-all duration-500' onClick={handleLogOut}>LogOut</button>

      <div className='flex gap-5 mt-6'>
        {products.map((items,index)=>(
          <div className='w-20 h-20 bg-purple-600 p-5' key={index}>
            <h1>{items.name}</h1>
            <p>{items.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
