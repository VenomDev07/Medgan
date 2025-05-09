import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { env } from '../envioronment/environment.dev';

  
function Login() {
  const [username, setUername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const login = async()=>{
    try {
        const data = {
            email: username,
            password: password
        }
        const res = await axios.post(`${env.baseUrl}login`,data)
        if(res.data.loggedIn){
            console.log(res.data);
            
            localStorage.setItem('userInfo',JSON.stringify(res.data.userData))
            navigate('/dashboard')
        }
        else{
            console.log("Invalid Credentials 🤕");
            alert("Unauthorized Access")
            setPassword('')
            setUername('')
        } 
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} >
        <div className='container flex justify-center min-w-full items-center min-h-screen login-body'>
            <div className='flex flex-row h-[550px] w-[330px] sm:w-[70%] sm:h-[600px] md:shadow-lg rounded-md '>
                <div className='md:flex hidden flex-col items-center justify-center md:w-[50%] h-full rounded-md login-con-1'>
                    <div className='w-[80%] h-[75%] rounded-sm pt-28 pl-10 cursor-default bg-white/15 '>
                        <p className='text-5xl login-info text-white'>See clearer.</p>
                        <p className='text-5xl login-info text-white'>Diagnose smarter.</p>
                        <p className='text-5xl login-info text-white'>Enhance</p>
                        <p className='text-5xl login-info text-white'>with <span className='text-black'>MEDGAN.</span></p>
                        <p className='text-[14px] text-amber-50 mt-7'>Upload your medical scans and witness powerful AI enhancement for sharper, more accurate visuals—built for modern diagnostics.</p>
                    </div>
                </div>
                <form className='flex flex-col items-center justify-start p-2 h-full w-full rounded-md md:w-[50%]'>
                    <h2 className='text-3xl font-bold mt-7 cursor-default'>Login</h2>
                    <div className='flex flex-col gap-3 w-[75%] mt-10'>
                        <h4 className='text-[16px] font-semibold'>Email</h4>
                        <input type="email" onChange={(e) => setUername(e.target.value)} value={username} className='h-10 login-input outline-1 focus:outline-red-200 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-3 w-[75%] mt-10'>
                        <h4 className='text-[16px] font-semibold'>Password</h4>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='h-10 login-input outline-1 focus:outline-red-200 rounded-md' />
                    </div>
                    <div className='flex items-center justify-between gap-3 w-[75%] mt-2'>
                        <a className='login-forgot text-[14px] font-semibold' href="">Forgot password ?</a>
                        <a className='login-forgot text-[14px] font-semibold cursor-pointer'onClick={() => navigate('/signUp')}>Sign Up</a>

                    </div>
                    <div className='flex items-center justify-end gap-3 rounded-md h-10 w-[75%] mt-7'>
                        <button className='w-full h-full transform active:scale-98 transition ease-linear cursor-pointer login-button text-[16px] rounded-md text-white font-semibold' onClick={(e) => {e.preventDefault();login()}} >Login</button>
                    </div>
                    <div className='flex items-center justify-end gap-3 rounded-md h-10 w-[75%] mt-7'>
                        <div className='w-[45%] bg-gray-300 h-[1.5px]'></div>
                        <div className='font-medium text-gray-400 cursor-default'>or</div>
                        <div className='w-[45%] bg-gray-300 h-[1.5px]'></div>
                    </div>
                    <div className='flex items-center justify-end gap-3 rounded-md h-10 w-[75%] mt-7'>
                        <button className='w-full h-full transform active:scale-98 transition ease-linear flex items-center justify-center gap-x-1.5 cursor-pointer text-[14px] rounded-md text-black border font-semibold'>
                            <img src='src\assets\google.png' className='w-8 h-8 rounded-full bg-transparent' alt="" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </motion.div>
  )
}

export default Login