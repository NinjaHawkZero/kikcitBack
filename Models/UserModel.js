const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({

    name:String,
    userID:String,
    profileImage:String,
    deviceToken:String,
    kikcitPoints: Number,
    consumerCategory:String,
    consumerPersona: String,
    didCompleteQuiz:Boolean ,
    userType:String

    
});



let userModel = mongoose.model("User", userSchema)


module.exports = {
    userModel
}