const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //fetch the data
    const { sectionName, courseID } = req.body;
    //validation
    if (!sectionName || !courseID) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });

    //update course with section ObjectID
    const updatedCourseDetails = Course.findByIdAndUpdate(
      courseID,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    
    //HW: use populate to replace section/subsection both in the updatedCourseDetails
    // const updatedCourseDetails = await Course.findByIdAndUpdate(
    //   courseID,
    //   {
    //     $push: {
    //       courseContent: newSection._id,
    //     },
    //   },
    //   { new: true }
    // ).populate({
    // path: "courseContent",
    // populate: {
    // path: "subSections",
    // model: "Subsection",
    // },
    // },
    // });


    //return response
    return res.status(200).json({
        success:true,
        message: "Section created successfully",
        updatedCourseDetails,
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      succees: false,
      message: "something went wrong while creating the section",
      error: error.message,
    });
  }
};



//update section

exports.updateSection = async (req,res) =>{
    try{
        //fetch data
        const {sectionName, sectionId} = req.body;

        //validation

        if (!sectionName || !sectionId) {
            return res.status(400).json({
            success: false,
            message: "Missing Properties",
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName},{new:true})

        //return res
        return res.status(200).json({
            seccess:true,
            message: "Section Updated successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            succees: false,
            message: "something went wrong while updating the section",
            error: error.message,
        });
    }
}


//delete section for deleting section

exports.deleteSection = async (req,res) =>{
    try{
        //get ID -- assuming that we are sending ID in params
        const {sectionId} = req.params;

        //delete data
        const section = await Section.findByIdAndDelete(sectionId);

        //return res
        return res.status(200).json({
            seccess:true,
            message: "Section Deleted successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            succees: false,
            message: "something went wrong while deleting the section",
            error: error.message,
        });
    }
}














