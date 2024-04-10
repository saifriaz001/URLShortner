import {useState} from 'react'
import { sendotp } from '../../services/operations/authAPI'
import { setSignupData } from '../../slices/authSlice'
import { toast } from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {  useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import image from "../../assets/shortner.png"


const SignupForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const [formData , setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)

    const { firstName , 
        lastName,
        email,
        password,
        confirmPassword} = formData

//handle input fields , when some value changes

const handleOnChange =(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value,
    }))
}

//handle form submission 
const handleOnSubmit =(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
        toast.error ("Passwords Do Not Match ")
        return
    }
    const signupData ={
        ...formData
    }
    //setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    //send OTP to user for verification
    dispatch(sendotp(formData.email , navigate))

    //reset
    setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
}

  return (
    <div>
        <div className='w-100vw flex flex-row mx-auto h-[585px] justify-between items-center'>
        <div className='w-[500px]  flex  mx-auto items-center justify-center ' >
        <form onSubmit={handleOnSubmit}>
            <p className='text-black text-wrap text-3xl 
             space-y-3 uppercase'>Create a free account.</p>
            <div className='flex flex-row space-x-4'>
                <label>
                    <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
                    >First Name <sup className=' text-red-500'>*</sup></p>
                    <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder='Enter first name'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full border border-black rounded-[0.5rem] pr-10 bg-richblack-800 p-[12px]
                       text-richblack-5"
                    />
                </label>
                <label>
                    <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
                    >Last Name<sup className=' text-red-500'>*</sup></p>
                    <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] border border-black pr-10 bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
            </div>
            <label>
                <p
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
                >Email Address <sup className=' text-red-500'>*</sup></p>
                <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder='Enter email Address'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 border border-black p-[12px] text-richblack-5"
                />
            </label>
            <div className=' flex flex-row space-x-4'> 
                <label className='relative'>
                    <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
                    >Create Password<sup className=' text-red-500'>*</sup></p>
                    <input
                     required
                     type={showPassword ? "text" :"password"}
                     name='password'
                     value={password}
                     onChange={handleOnChange}
                     placeholder='Enter Password'
                     style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 border border-black text-richblack-5"
                    />
                    <span
                    
                    onClick={()=>setShowPassword((prev)=> !prev)}
                    className="absolute right-3 top-[48px] z-[10] cursor-pointer">
                        {
                            showPassword ? (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                            ):(
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                            )
                        }
                    </span>

                </label>
                <label className='relative'>
                    <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
                    >Confirm Password <sup className=' text-red-500'>*</sup></p>
                    <input
                    required
                    type={showConfirmPassword ?"text":"password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Confirm Password'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] border border-black bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                     onClick={()=>setShowConfirmPassword((prev) =>!prev)}
                     className="absolute right-3 top-[48px] z-[10] cursor-pointer"
                    >{
                        showConfirmPassword?(
                            <AiOutlineEye  fontSize={24} fill="#AFB2BF"/>
                        ):(
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        )
                    }
                    </span>
                </label>
            </div>
            <button
            type="submit"
            className=" rounded-[8px] bg-slate-900 py-[6px]
         px-[13.3rem] text-base text-white space-x-3 mt-5"
            >
                SIGN UP
            </button>
        </form>
        </div>
        <div className='relative flex mx-auto items-center 
        justify-center'>
            <img src={image} width={600} height={600}/>

        </div>
        
    </div>
    </div>
  )
}          

export default SignupForm;