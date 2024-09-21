const mongoose = require("mongoose")


const businessSchema = new mongoose.Schema({
    
    businessName:String,
    userID:String,
    businessAddress:String,
    businessType:String,
    businessPhone:String,
    businessWebsite:String,
    businessHours:[{Mon:String}, {Tue:String}, {Wed:String}, {Thurs:String}, {Fri:String}, {Sat:String}, {Sun:String}],
    businessAbout:String,
    kikcitPoints:Number,
    consumerCategory:String,
    localRecommendationCategory:String,
    latitude: Number,
    longitude: Number,
    profileImage: String,
    didCreateBusiness: Boolean

});


let businessModel = mongoose.model("Business", businessSchema)



module.exports = {
    businessModel
}