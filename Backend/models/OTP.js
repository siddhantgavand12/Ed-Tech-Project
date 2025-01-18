const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5*60,
    },
});

// a fuction to generate OTP
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = mailSender(email,"OTP for StudyNotion",`Your OTP is ${otp}`);
        console.log("email sent successfully: ", mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails: " , error.message);
        throw error;
    }
}

// presave middleware

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})


module.exports = mongoose.model('OTP', OTPSchema);
