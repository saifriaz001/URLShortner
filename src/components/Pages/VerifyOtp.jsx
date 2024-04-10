import React, {useEffect, useState} from "react"
import OTPInput from "react-otp-input"
import { useSelector,useDispatch } from "react-redux";
import { signup } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {

    const [otp , setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading  , signupData} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }},[])

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const {email,
        confirmPassword , 
        password,
        lastName,
        firstName,
    } = signupData;
    dispatch(signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate));
    }



  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        <div className="max-w-[500px] p-8 ">
            <h1 className=" text-black font-semibold
            text-[1.875rem] leading-[2.375rem]  ">Verify Email</h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4
             text-black">
                A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleOnSubmit}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  inputStyle ="W-[20px] rounded-[8px] border-[1px]
                    border-gray-100  text-[3rem] text-center "
                    focusStyle="border-[5px] border-red-500"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-between gap-4"
                    renderInput={(props)=><input{...props}/>}
                />
                <button
                type="submit" 
                className="w-full bg-slate-900 py-[12px]
                px-[12px] rounded-[8px]
                mt-6 font-medium text-white">
                    Verify Email
                </button>
            </form>
        </div>
    </div>
  )
}

export default VerifyOtp