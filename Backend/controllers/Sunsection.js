const Subsection = require("../models/SubSection");
const Section = require("../models/Section");

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
        // create a subsection
        // update section with this sub section objectID
        // retrun res
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message: "Error while creating subsection"
        })
    }
}