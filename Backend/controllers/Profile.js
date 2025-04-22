const Profile = require('../models/Profile');
const User = require('../models/User');

exprots.updateProfile = async (req, res) => {

    try{
        //get data
        const {dateOfBirth="", about="", contactNumber,gender} = req.body;
        //get userId
        const userId = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(401).json({
                success:false,
                message: "All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById(userId);    
        const profileId = userDetails.additionalDetails;
        const profileDetails = Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return res
        return res.status(200).json({
            success:true,
            message: "Profile updated successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while updating profile",
            error: error.message,
        });
    }

};

//delete account

exports.deleteAccount = async (req, res) => {
    try{
        //get userId
        const userId = req.user.id;
        //validation
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "User not found"
            })
        }
        //find profile
        const userDetails = await User.findById(userId);    
        const profileId = userDetails.additionalDetails;
        const profileDetails = Profile.findById(profileId);

        //delete account
        await Profile.findByIdAndDelete(profileId);
        
        // HW: unenroll user from all enrolled courses

        await User.findByIdAndDelete(userId);


        //return res
        return res.status(200).json({
            success:true,
            message: "Account deleted successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while deleting account",
            error: error.message,
        });
    }
} 


exports.getAllUserDetails = async (req, res) => {  
    try{
        //get userId
        const userId = req.user.id;
        //validation
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "User not found"
            })
        }
        //find profile
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        //return res
        return res.status(200).json({
            success:true,
            message: "User details fetched successfully",
            userDetails,
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while fetching user details",
            error: error.message,
        });
    }


}   