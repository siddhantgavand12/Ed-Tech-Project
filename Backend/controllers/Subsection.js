const Subsection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsections

exports.createSubsection = async (req, res) =>{
    try{
        //fetch the data
        const{sectionId, title, timeDuration, description} =  req.body;
        // extract file/video
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(401).json({
                success:false,
                message: "All fields are required"
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create a subsection
        const subSectionDetails = await Subsection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            video: uploadDetails.secure_url
        })
        // update section with this sub section objectID
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, {
            $push:{ 
                subSections: subSectionDetails._id
            }
        }, {new:true}).populate("subSections");
        // retrun res
        return res.status(200).json({
            success:true,
            message: "Subsection created successfully",
            updatedSection,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Error while creating subsection",
            error : error.message,
        })
    }
}


//update Subsections

exports.updateSubsection = async (req, res) =>{ 
    try{
        //fetch the data
        const{subsectionId, title, timeDuration, description} =  req.body;
        // extract file/video
        const video = req.files.videoFile;

        // validation
        if(!subsectionId || !title || !timeDuration || !description || !video) {
            return res.status(401).json({
                success:false,
                message: "All fields are required"
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // update subsection
        const updatedSubsection = await Subsection.findByIdAndUpdate({_id:subsectionId}, {
            title:title,
            timeDuration:timeDuration,
            description:description,
            video: uploadDetails.secure_url
        }, {new:true});
        // retrun res
        return res.status(200).json({
            success:true,
            message: "Subsection updated successfully",
            updatedSubsection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Error while updating subsection",
            error : error.message,
        })
    }
}


//delete Subsections

exports.deleteSubsection = async (req, res) =>{
    
    try{
        //fetch the data
        const{subsectionId} =  req.body;
        // validation
        if(!subsectionId) {
            return res.status(401).json({
                success:false,
                message: "All fields are required"
            })
        }
        // delete subsection
        const deletedSubsection = await Subsection.findByIdAndDelete({_id:subsectionId});
        // update section with this sub section objectID
        const updatedSection = await Section.findByIdAndUpdate({_id:deletedSubsection.sectionId}, {
            $pull:{
                subSections: deletedSubsection._id
            }
        }, {new:true}).populate("subSections");
        // retrun res
        return res.status(200).json({
            success:true,
            message: "Subsection deleted successfully",
            updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Error while deleting subsection",
            error : error.message,
        })
    }
}

 