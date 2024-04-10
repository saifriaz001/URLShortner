import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/dbConfig.js"
import routes from "./src/routes/routes.js"
dotenv.config();

const port = process.env.PORT||5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:true}));

app.use(
    cors({
        origin:"*",
        credentials:true,
    })
);

app.use("/api/", routes);

app.get("/",(req, res)=>{
    res.send("Hello World!");
});
connectDb();

app.listen(port ,()=>{
    console.log(`Server started successfully on port : ${port}`);
})