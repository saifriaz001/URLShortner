import {toast} from "react-hot-toast"
import { endpoints } from "../../components/helpers/Constants"
import { setLoading ,setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice"


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API
}= endpoints


export function sendotp (email, navigate){
    return async(dispatch)=>{
    const toastId = toast.loading("Loading")
    dispatch (setLoading(true))
    try {
        const response = await apiConnector("POST" , SENDOTP_API,{
            email,
            checkUserPresent:true,
        })
        console.log("SENDOTP API Response ......" , response)
        console.log(response.data.success)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
    } catch (error) {
        console.log("SENDOTP API ERROR......", error)
        toast.error(error?.response?.data?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function signup(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch)=>{
        const toastId = toast.loading ("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST" , SIGNUP_API ,
            {
                firstName,
                lastName,email,
                password,confirmPassword,otp
            })
            console.log("SIGNUP API RESPONSE ......" , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")

        } catch (error) {
            console.log("SIGNUP API ERROR......." , error)
            toast.error("Signup failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login( email , password , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,
                password,
            })
            console.log("LOGIN API RESPONSE........" , response)

            if(!response.data.success){
                throw new Error( response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            dispatch(setUser({...response.data.user}))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
        } catch(error){
            console.log("Login api error......" , error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return(dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
        
    }
}