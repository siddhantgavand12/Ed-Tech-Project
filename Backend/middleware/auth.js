const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) =>{
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // if token is mission
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token is missing"
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch{error}{
            // verification - issue
            return res.status(401).json({
                success:false,
                message: "token is invalid"
            });
        }

        next();
    }   
    catch(error){
        return res.status(401).json({
            success:false,
            message: "something went wrong while validating the token",
        })
    }   
}


//isStudent

exports.isStudent = async (req, res, next) =>{
    try{
        if(req.user.accoutType != "Student"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for Students only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again"
        });
    }
}

//isInstuructor
exports.isInstuructor = async (req, res, next) =>{
    try{
        if(req.user.accoutType != "Instuructor"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for isInstuructor only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again"
        });
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) =>{
    try{
        if(req.user.accoutType != "Admin"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for Admin only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again"
        });
    }
}