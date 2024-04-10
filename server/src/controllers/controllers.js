import express from "express"
import  urlModel  from "../models/schema.js";

export const createUrl = async(req , res)=>{
try {
    console.log("The fullUrl is" , req.body.fullUrl);
    const {fullUrl} = req.body;
    //performing  Validation that the same url is present or not
    const urlFound = await urlModel.find({ fullUrl : req.body.fullUrl})
    if(urlFound.length >0){
        return res.status(400).json({
            success:false,
            message:"This is link is already present",
            urlFound,
        })
        
    } else{
        const shortUrl = await urlModel.create({ fullUrl});
        res.status(200).json({
            sucess:true,
            message:"ShortLink Sucessfully created",
            shortUrl
            
        })
    }

    
} catch (error) {
    res.status(500).json({
        message:"Something Went Wrong"
    });
    
}
};

export const getAllUrl = async(req , res)=>{
  try {
    const shortUrls = await urlModel.find().sort({createdAt: -1});

    if(shortUrls.length === 0 ){
        res.status(400).send({ message :"Short Urls not found!"});
    } else{
        res.status(200).send (shortUrls);
    }
  } catch (error) {
    res.status(500).send({
        message:"Something Went Wrong"
    });
  }
};

export const getUrl = async(req , res)=>{
    try {
        const shortUrl = await urlModel.findOne({shortUrl:req.params.id})
        if(!shortUrl){
            res.status(404).send({message:"Full Url not found!"});
        } else{
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch (error) {
        res.status(500).send({
            message:"Something Went Wrong"
        });
    }

};

export const deleteUrl = async(req , res)=>{
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id:req.params.id});
        if(shortUrl){
            res.status(200).send({ message:"Requested URl successfully!"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Something Went Wrong"
        })
        
    };

};