import  {useState} from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {useDispatch} from "react-redux"
import { useNavigate} from "react-router-dom"
import image from "../../assets/analytics-illustration.png"
import {login} from "../../services/operations/authAPI"


 
 const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData , setFormData] = useState({
        email:"",
        password:"",
    })

    const [showPassword , setShowPassword] = useState(false)
    const { email , password} = formData

    const handleOnChange =(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }

    const handleOnSubmit =(e)=>{
        e.preventDefault()
        dispatch(login(email, password , navigate))
    }


   return (
    <div>
    <div className=" w-100vw flex flex-row  mx-auto
     h-[585px] justify-between items-center">

    <div className=" w-[500px]   flex mx-auto justify-center items-end  ">

     <form onSubmit={handleOnSubmit}
      className=" space-y-11"
     >
        <p className=" text-black  text-wrap text-3xl 
        -mt-10  space-y-3 uppercase">Log into your account </p>
        <label className="w-full space-y-2">
            <p
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-black space-y-3 mt-3 "
            >Email Address<sup className=" text-red-500">*</sup></p>
            <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full border border-black rounded-[0.5rem] 
             p-[12px]"
            />
        </label>
        <label className="relative space-y-3">
            <p className="mt-3 text-[0.875rem] leading-[1.375rem]">
                Password <sup className=" text-red-500">*</sup>
            </p>
            <input
            required 
            type={showPassword ? "text" :"password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-black rounded-[0.5rem] p-[12px] pr-12 text-richblack-5"
            />
            <span
            onClick={()=>setShowPassword((prev)=>!prev)}
            className="absolute right-3 top-[82px] z-[10] cursor-pointer">
                {
                    showPassword ?(
                        <AiOutlineEye  fontSize={24} fill="#AFB2BF"/>
                    ):(< AiOutlineEyeInvisible   fontSize={24} fill="#AFB2BF"/>)
                } 
            </span>
        </label>
        <button type='submit' 
        className=" rounded-[8px] bg-slate-900 py-[6px]
         px-[14rem] text-base text-white"
        >
                LOG IN
        </button>
     </form>
     </div>
     <div className="relative flex mx-auto items-center
      justify-center  ">
        <img src={image} width={600} height={600}
        className="" />
        
        
        
     </div>
     </div>
     <div className=" ">

     </div>
     </div>
   )
 }
 
 export default LoginForm