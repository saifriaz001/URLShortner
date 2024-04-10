export const serverUrl = 
import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

//AUTH ENDPOINTS
export const endpoints ={
    SENDOTP_API : serverUrl +"/sendotp",
    SIGNUP_API : serverUrl +"/signup",
    LOGIN_API : serverUrl +"/login",
    CREATEURL_API : serverUrl+ "/createurl1",
    GETALLURL_API: serverUrl + "/getallurl"
}

