import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
export default function Login() {
    const [currState, setCurrState] = useState("Login")
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        if (currState === "Sign Up" && !name) {
            toast.error("Please enter your name")
            setLoading(false);
            return;
        }

        try {
            const endpoint = currState === "Login"? "login" : "signup";
            const userData = currState === "Login" 
            ? {email,password}
            : {name,email,password}

            const response = await fetch(`http://localhost:5000/auth/${endpoint}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`${currState} Successfully`);
                setName("");
                setEmail("");
                setPassword("");

                if (data.jwToken) {
                    localStorage.setItem('token', data.jwToken);
                    if (currState === "Login") {
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000);  
                }else{
                    setTimeout(() => {
                        setCurrState("Login")
                    }, 1000);
                }
                }
                if(data.name){
                    localStorage.setItem('currentUser', data.name);
                }
                console.log('success:', data);
                
            }else{
                toast.error(data.message || `${currState} failed`)
            }
        } catch (error) {
             toast.error("Network error. Please try again.");
            console.error('Error:', error);
        } finally{
            setLoading(false)
        }
    }
  return (
    <div className=' bg-[#460451] w-screen h-screen flex items-center justify-center'>
        <div className='bg-[#00000067] w-100 h-auto rounded-lg text-white px-5 py-7'>
            <h1 className='font-bold text-4xl text-center'>{currState}</h1>
            <form className='mt-5' onSubmit={handleSubmit}>
                {
                    currState === "Sign Up" && (
                <label htmlFor="" className=''>
                    <p className='text-lg font-medium'>Name</p>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='outline-none border w-full mt-2 bg-white text-gray-500 py-1 pl-2  rounded ' />
                </label>
                    )
                }
                <label htmlFor="" className=''>
                    <p className='text-lg font-medium mt-2'>Email</p>
                    <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className='outline-none border w-full mt-2 bg-white text-gray-500 py-1 rounded pl-2 ' />
                </label>
                <label htmlFor="" className='relative'>
                    <p className='text-lg font-medium mt-2'>Password</p>
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} className='outline-none border w-full mt-2 bg-white text-gray-500 py-1 rounded pl-2 ' />
                    <p className='absolute right-2 bottom-0 z-2 text-gray-400 cursor-pointer' onClick={()=>setShowPass(!showPass)}>{showPass ? <FaRegEye />: <FaRegEyeSlash  />}</p>
                </label>
                <button className='w-full  mt-5 py-2 bg-purple-400 rounded-lg cursor-pointer hover:bg-purple-500 font-extrabold'  type="submit"   disabled={loading}>
                    {loading ? "Processing..." : (currState === "Login" ? "Login" : "Sign Up")}
                </button>

                
            </form>
            {
                currState === "Login" ?
                <p className='mt-2 text-sm'>You Don't have any account? <span className=' hover:text-blue-500 hover:underline text-white cursor-pointer' onClick={()=>setCurrState("Sign Up")}>Sign Up</span></p>
                :<p className='mt-2 text-sm'>if you have Already an account? <span className=' hover:text-blue-500 hover:underline text-white cursor-pointer' onClick={()=>setCurrState("Login")}>Login</span></p>
            }
            <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
        </div>
    </div>
  )
}
