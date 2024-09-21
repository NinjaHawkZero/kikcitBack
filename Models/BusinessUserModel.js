const mongoose = require("mongoose")


const businessUserSchema = new mongoose.Schema({

    name:String,
    userID:String,
    businessID: {type: mongoose.Schema.Types.ObjectId, ref:'Business'},
    deviceToken:String,
    userType: String
   
});



let businessUserModel = mongoose.model("businessUser", businessUserSchema)


module.exports = {
    businessUserModel
}