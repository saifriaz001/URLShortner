import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();


export const mailSender = async(email,title , body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let  info = await transporter.sendMail({
            from:`"URLSHORTNER"<${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info);
        return info
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

