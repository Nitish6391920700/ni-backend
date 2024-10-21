import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'dcqld0eh5', 
  api_key: '284259273365169', 
  api_secret: 'LpEj92z0kGO6Rs2qrB5KeHa37ys' ,
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        // console.log(localFilePath)
        if(!localFilePath) return null; // checking if path exist
        //upload
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file uploaded
        console.log("file uploaded successfully",response.url)
         fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temprory file as the upload operation get  failed
        console.log(error)
        return null
        
    }
 }



export {uploadOnCloudinary}