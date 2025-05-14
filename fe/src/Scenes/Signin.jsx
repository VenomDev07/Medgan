import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios';
import { env } from '../envioronment/environment.dev';
import { useNavigate } from 'react-router-dom';

function Signin() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async () =>{
        debugger
        try {
            const data = {
                name,
                email,
                password
            }
            const res = await axios.post(`${env.baseUrl}signIn`,data)
            if(res.data.EmailExists){
                alert("Email Already Exists")
                setEmail('');
                setName('');
                setPassword('');
            }
            else if(res.data.signedIn){
                navigate('/login')
                setEmail('');
                setName('');
                setPassword('');
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
                                <p className='lg:text-5xl md:text-4xl login-info text-white'>Diagnose</p>
                                <p className='lg:text-5xl md:text-4xl login-info text-white'>Smarter</p>
                                <p className='lg:text-5xl md:text-4xl login-info text-white'>Enhance</p>
                                <p className='lg:text-5xl md:text-4xl login-info text-white'>with <span className='text-black'>MEDGAN</span></p>
                                <p className='text-[14px] text-amber-50 mt-7'>Witness powerful AI enhancement for sharper, more accurate visuals—built for modern diagnostics.</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-start p-2 h-full w-full rounded-md md:w-[50%]'>
                            <h2 className='text-3xl font-bold mt-7 cursor-default'>Sign up</h2>
                            <div className='flex flex-col gap-3 w-[75%] mt-10'>
                                <h4 className='text-[16px] font-semibold'>Name</h4>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='h-10 login-input outline-1 focus:outline-red-200 rounded-md' />
                            </div>
                            <div className='flex flex-col gap-3 w-[75%] mt-10'>
                                <h4 className='text-[16px] font-semibold'>Email</h4>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className='h-10 login-input outline-1 focus:outline-red-200 rounded-md' />
                            </div>
                            <div className='flex flex-col gap-3 w-[75%] mt-10'>
                                <h4 className='text-[16px] font-semibold'>Password</h4>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='h-10 login-input outline-1 focus:outline-red-200 rounded-md' />
                            </div>
                            <div className='flex items-center justify-between w-[75%] mt-2 cursor-pointer'>
                                <a className='login-forgot text-[14px] font-semibold'onClick={() => navigate('/login')}>Already have account ?</a>
                                <a className='login-forgot text-[14px] font-semibold'onClick={() => navigate('/login')}>Login</a>
                            </div>
                            <div className='flex items-center justify-end gap-3 rounded-md h-10 w-[75%] mt-5'>
                                <button className='w-full h-full transform active:scale-98 transition ease-linear cursor-pointer login-button text-[16px] rounded-md text-white font-semibold' onClick={(e) => {e.preventDefault();signIn()}}>Sign Up</button>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
  )
}

export default Signin