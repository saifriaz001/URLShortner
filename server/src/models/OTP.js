import mongoose from "mongoose";
import {mailSender} from "../utilis/mailSender.js"
//const mailSender = require("../utilis/mailSender.js")
import {otpTemplate} from "../utilis/emailVerficationTemplate.js"
//const emailVerficationTemplate = require("../utilis/emailVerficationTemplate.js")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
//this document wil  be automatically deleted after 5 minutes of its  creation time
        expires:60*5,
    },
});

//Define a function to send emails

async function sendVerificationEmail(email , otp){
    //create a transporter to send emails
    //define the email options
    //send the email
    try {
        const mailResponse = await mailSender(
             email,
             "Verification Email",
             otpTemplate(otp)
        );
        console.log("Email sent Successfully: ", mailResponse);

    } catch (error) {
        console.log("Error occurred While Sending Email: ", error);
        throw error;
    }

}

//Define a post-save hook to send email after the document has been saved

OTPSchema.pre("save" , async function(next){
    console.log("New Document saved  to database");

    //Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email , this.otp);
    }
    next();
});

export const OTP = mongoose.model("OTP" , OTPSchema);


