const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({

    userID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);