const Course = require("../models/Course")
const Tag = require("../models/tags")
const User = require("../models/User")
const uploadImageToCloudinary = require("../utils/imageUploader");


// createcourse handleer function
exports.createCourse = async (req,res)=>{
    try {

        //fetch data
        const{courseName, courseDescription, whatYouWillLearn, price, tag,} = req.body;
        //get thubnail
        const thubnail = req.files.thubnailImage;

        //validation
        if(!courseName || !whatYouWillLearn || !price || !tag || !thubnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            });
        }

        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            });
        }

        //upload image to cloudinary
        const thubnailImage = await uploadImageToCloudinary(thubnail,process.env.FOLDER_NAME);

        // create and entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thubnailImage.secure_url,
        })

        //add the new course to the user schema of Instructor
        await User.findOneAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        )

        //update the TAG ka schema
        // TODO: HW

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        })



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"Faild to create course",
            error: error.message,
        })
    }
}




//getallcourses handler function
exports.showAllCourses = async (req, res) =>{
    try{
        const allCourses = await Course.find({}).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data:allCourses,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"Cannot Fetch course data",
            error: error.message,
        })
    }
}