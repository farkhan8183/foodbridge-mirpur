import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
//import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext, { authDataContext } from '../../context/AuthContext';
import DonorLogin from './DonorLogin';
import DonorPanel from './donorpanel';
import { userDataContext } from '../../context/userContext';

import axios from 'axios'
//import { signInWithPopup } from 'firebase/auth';
//import { auth, provider } from '../../utils/Firebase';
//import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

function DonorRegistration() {
    let [show,setShow] = useState(false)
    let {serverUrl} = useContext(authDataContext)   //recieve the URL context value here 
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [phoneNumber,setPhoneNumber] = useState("")
    let [address,setAddress] = useState("")
    let [donorType,setDonorType] = useState("Individual")
    let {userdata , getCurrentUser} = useContext(userDataContext)
    let [loading,setLoading] = useState(false)

    let navigate = useNavigate()    //for navigation to pages,we used useNavigate

    const handleSignup = async (e) => { //***MAIN PART: handle signup when form is filled */
        setLoading(true)
        e.preventDefault()
        console.log("Sending data:", {name, email, password, address, phoneNumber, donorType});  // Log data before sending
        try {
         const result = await axios.post(serverUrl + '/api/auth/registration',{ //calls our backend sign-up api n sends form data
           name , email, password,address,phoneNumber,donorType
         },{withCredentials:true})
            getCurrentUser()
            navigate("/donorpanel")   //navigate to donor panel after successful signup
            toast.success("User Registration Successful")
            console.log(result.data)    //will return user data in console on succesfull signup!
            setLoading(false)

        } catch (error) {
            console.log("problem",error)
            const errorMessage = error.response?.data?.message || error.message;
            console.log("Backend error message:", errorMessage);  // Log specific error
            toast.error(`User Registration Failed: ${errorMessage}`)
            setLoading(false)
        }
    }

   /*  const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth , provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
            console.log(result.data)
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")

        } catch (error) {
            console.log(error)
            toast.error("User Registration Failed")
        }
        
    } */
  
  return (
    //The logo and its onClick logic
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}> {/* navigates to home */}
    <img className='w-[40px]' src={logo} alt="" />
    <h1 className='text-[22px] font-sans '>FoodBridge Mirpur</h1>
    </div>

    {/* the signup form */}

    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
     

    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
    
      <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'> {/* when user fill form, info ll be sent to backend from here! */}
      
      {/* will add G-Authentication here! */}
            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
             <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
            {/* input the details! */}
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]  relative'>
                <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName' required onChange={(e)=>setName(e.target.value)} value={name}/>
                 <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                  <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Phone Number' required onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
                  <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Address' required onChange={(e)=>setAddress(e.target.value)} value={address}/>
                  <select className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' required onChange={(e)=>setDonorType(e.target.value)} value={donorType}>
                    <option value="Individual" className='bg-[#141414]'>Individual</option>
                    <option value="Restaurant" className='bg-[#141414]'>Restaurant</option>
                  </select>
                  <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  
                  <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>{loading? <Loading/> :"Create Account"}</button>
                  <p className='flex gap-[10px]'>You have any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/donorlogin")}>Login</span></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default DonorRegistration