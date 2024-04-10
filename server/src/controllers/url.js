import express from "express"
import User  from "../models/User.js"
import  UrlModel  from "../models/schema.js"


export const  CreateUrl = async(req ,res)=>{
 try {
    const userId = req.user.id;
    console.log("The User ID ->" , userId);

    console.log( "The fullurl is ", req.body.fullUrl);

    const{fullUrl} = req.body;

    if(!fullUrl){
        return res.status(400).json({
            success:false,
            message:"This field is Mandatory",
        })
    }
    const shortUrl = await UrlModel.create({fullUrl});
    
    //Add the shortUrl to the User Schema
    await User.findByIdAndUpdate(
                                {_id:userId,},
                                {
                                    $push:{
                                        url:shortUrl
                                    },
                                    
                                }, {new:true});
    
    //Return the new Url and success message
    res.status(200).json({
        success:true,
        data:shortUrl,
        message:"Url is created successfully"
    });

 } catch (error) {
    //Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
        success:false,
        message:"Failed to create Url",
        error:error.message,
    });
    
 }
};


export const getallUrl = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user by ID and populate the 'url' field with UrlModel documents
        const user = await User.findById(userId).populate('url');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user.url, // Assuming 'url' field in the User model references UrlModel documents
            message: "URLs retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const DeleteUrl = async(req, res)=>{
    try {
        const Id = req.params.id
        console.log("printing the id->",Id)
        const userId = req.user.id
        console.log("Printing the userId->", userId)
        const shortUrl = await UrlModel.findByIdAndDelete(Id)
        if(!shortUrl){
            return res.status(400).json({
                success:false,
                message:"The url is not present"
            })
        }
        await User.findByIdAndUpdate(userId,{
                                            $pull:{url:Id} 
                                           })

        return res.status(200).json ({
            success:true,
            message:"Url is deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"There is an internal server error",
            error:error.message
        })
    }
}



export const GetUrl = async (req, res) => {
    try {
        const shortUrl = await UrlModel.findOne({ shortUrl: req.params.id });

        if (!shortUrl) {
            return res.status(404).send({ message: "Full Url not found!" });
        }

        // Increment clicks
        shortUrl.clicks++;
        await shortUrl.save();

        // Redirect to the full URL
        res.redirect(`${shortUrl.fullUrl}`);

        // Update the user's URL clicks
        //const userId = req.user.id // Assuming you have a userId field in your shortUrl schema
        //if (userId) {
          //  await User.findByIdAndUpdate(userId, { $inc: { "url.$[elem].clicks": 1 } }, { arrayFilters: [{ "elem._id": shortUrl._id }] });
        //}

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something Went Wrong" });
    }
};