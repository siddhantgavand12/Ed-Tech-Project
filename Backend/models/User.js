const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['Admin', 'Student','Instuctor'],
        required: true
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Profile"
    },
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Course"
        }
    ],
    image: {
        type: String,
        required: true
    },
    courseProgress: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"CourseProgress"
        }
    ],
});

module.exports = mongoose.model('User', userSchema);



