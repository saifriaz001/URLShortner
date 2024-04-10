import express from 'express';

import {  createUrl, deleteUrl, getAllUrl, getUrl } from "../controllers/controllers.js"
 
import {  signup ,login ,sendotp } from "../controllers/Auth.js"
import { CreateUrl ,getallUrl ,DeleteUrl,GetUrl } from '../controllers/url.js';


//import middlewares
import { auth } from '../middlewares/auth.js';

//const {login , signup , sendotp} = require("../controllers/Auth.js")
const router = express.Router();


//creating URL
router.post("/createurl1" , auth,CreateUrl);
router.get("/getallurl" ,auth , getallUrl);
router.delete("/delete/:id",auth , DeleteUrl);
router.get("/geturl/:id",GetUrl );
//****************************** Authentication Routes**********//

//Route For UserLogin
router.post("/login" , login)
//Route for user Signup
router.post("/signup" , signup)

//Route for sending Otp to user's email
router.post("/sendotp", sendotp)



router.post("/ShortUrl" , createUrl);
router.get("/ShortUrl" , getAllUrl);
router.get("/ShortUrl/:id", getUrl);
router.delete("/ShortUrl/:id" , deleteUrl);

export default router;


