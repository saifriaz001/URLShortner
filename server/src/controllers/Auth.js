import bcrypt from "bcrypt";
import User  from "../models/User.js";
//const User = require("../models/User.js")
import {OTP} from "../models/OTP.js";
//const OTP = require("../models/OTP.js")
import jwt from "jsonwebtoken";

import otpGenerator from "otp-generator";


//SignUp Controller for Registering User

export const signup = async(req, res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body

        //Check if All Details are here or not

        if(!firstName ||
            !lastName ||
            !email||
            !password ||
            !confirmPassword||
            !otp){
                res.status(403).json({
                    success:false,
                    message:"ALL Fileds are required",
                });
            }
            if( password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password And Confrim Password do not match. please try again"
                });
            }
            //Checking if user Already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User already exists . Please SignIn to continue"
                })
            }
            //Find the most recent Otp For the email
            const response = await OTP.find({email}).sort ({createdAt:-1}).limit(1);
            console.log(response)
            if(response.length ===0){
                //OTP not found for the email
                return res.status(400).json({
                    success:false,
                    message:"This OTP is not valid",
                });
            } else if( otp !== response[0].otp){
                //Invalid OTP
                return res.status(400).json({
                    success:false,
                    message:"This OTP is not Valid",
                });
            }
            //Hash the password
            const hashedPassword = await bcrypt.hash(password,10);

            //create the user
            const user = await User.create({
                firstName,
                lastName,
                password:hashedPassword,
                email,

            });
            return res.status(200).json({
                success:true,
                user,
                message:"User registered successfully",
            });        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again.",
        });
    }
};

//login controllers for authenticating Users

export const login = async ( req , res) =>{
    try {
        //Get email and password from request body
        const {email , password} = req.body;

        //Checking if email or password is missing
        if(!email ||!password){
            //Return 400 Bad request status code with error message
            return res.status(400).json({
                success:false,
                message:"Please fill up all the required fields",
            });
        }
        //Fnd  user with provided email
        const user = await User.findOne({email});
        if(!user){
            //Return 401 Unauthorized Status code with error Message
            return res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please signUp to continue",
            });
        }
        //Generate JWT TOken and Compare Password
        if(await bcrypt.compare(password ,user.password)){
            const token = jwt.sign(
                {email: user.email , id:user._id},
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            );
            console.log(user)
        
        //Save Token to user document in database
        

        const oldUser ={...user, token};
        oldUser.password = undefined;
        console.log(oldUser);

        user.token = token;
        console.log(user)
        user.password = undefined;
        console.log(user);
        //set cookie for token and return success response
        const options={
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        };

        req.headers['Authorization'] = `Bearer ${token}`;
        res.cookie("token" , token , options).status(200).json({
            success:true,
            token,
            user,
            message:`User Login Success`,
        });
      } else{
        return res.status(401).json({
            success:false,
            message:"Password is incorrect",
        });
      }
    } catch (error) {
        console.log(error)
        //Return 500 Internal Server Error Status code with error message
        return  res.status(500).json({
            
            success:false,
            message:"Login failure please try again",
        });
    }
};

//Send OTP For email verififcation
export const sendotp = async(req, res)=>{
    try {
        const {email} = req.body
        //Check if user is already present
        //Find user with provided email
        const checkUserPresent = await User.findOne({email});
        //to be used in case of signup
        //if user founded with provided email
        if(checkUserPresent){
            //return 401 Unauthorized status Code With error message
            return res.status(401).json({
                success:false,
                message:"User is Already Registered",
            });
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        const result = await OTP.findOne({otp:otp});
        console.log("Result is Generate OTP Func");
        console.log("OTP" , otp)
        console.log("Result" , result);
        while(result){
            otp = otpGenerator(6,{
                upperCaseAlphabets:false,
            });
        }
        const otppayload ={email , otp};
        const otpBody = await OTP.create(otppayload);
        console.log("OTP Body" , otpBody);
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
}