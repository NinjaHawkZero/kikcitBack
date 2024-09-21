let express = require("express");
let { businessModel } = require("../Models/BusinessModel")
let { userModel } = require("../Models/UserModel")
let { businessUserModel } = require("../Models/BusinessUserModel") 
let kikcitRouter = new express.Router()

//Requiring firebase
const  { initializeApp } = require("firebase/app");
const config = require('../config')


//Requiring multer
var multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}).single("file");


const firebaseConfig = {
    apiKey: "AIzaSyDwuWH3q_a6xI9ilZZfKzSEng6YgE7BHUg",
    authDomain: "kikcit-c392d.firebaseapp.com",
    databaseURL: "https://kikcit-c392d-default-rtdb.firebaseio.com",
    projectId: "kikcit-c392d",
    storageBucket: "kikcit-c392d.appspot.com",
    messagingSenderId: "298354598481",
    appId: "1:298354598481:web:93e9905f09d64716050e70",
    measurementId: "G-QKM5EQXS58"
  };


//Initialize firebase
initializeApp(firebaseConfig)

const {getStorage, getDownloadURL, ref, uploadBytesResumable} = require('firebase/storage');

//Initalize storage
const defaultStorage = getStorage() //reference to firebase storage

global.XMLHttpRequest = require("xhr2");




//User Registration
kikcitRouter.post('/userRegister', async (req, res) => {

    try{
    
        console.log("happend first")
   
    const name = req.body.name;
    const userID = req.body.userID;
    const deviceToken = req.body.deviceToken;
    
    
    
    //Check if credentials are present
    if( !userID || !name) {
        throw new Error("User details required!")
    }
    
    //Try to find user
    let foundUser = await userModel.find({userID: userID});
    
    if(foundUser.length > 0) {
    
        let user = foundUser[0];
    
        res.status(200).json({user: user})
    }
    
    else {
    //Create new user
    let user = await userModel.create({ name: name, userID: userID, deviceToken: deviceToken});
    
    res.status(201).json({user: user})
    
    }
    
    
    
    }
    
    catch(err) {
    
        res.status(400).json({message: err.message})
    }
    });


//Business User Register

    kikcitRouter.post('/businessUserRegister', async (req, res) => {

        try{
        
           
            console.log("happend first")
       
        const name = req.body.name;
        const userID = req.body.userID;
        const deviceToken = req.body.deviceToken;
        
        
        
        //Check if credentials are present
        if( !userID || !name) {
            throw new Error("User details required!")
        }
        
        //Try to find user
        let foundUser = await businessUserModel.find({userID: userID});
        
        if(foundUser.length > 0) {
        
            let user = foundUser[0];
        
            res.status(200).json({user: user})
        }
        
        else {
        //Create new user
        let user = await businessUserModel.create({ name: name, userID: userID, deviceToken: deviceToken});
        
        res.status(201).json({user: user})
        
        }
        
        
        
        }
        
        catch(err) {
        
            res.status(400).json({message: err.message})
        }
        });





    //Login user with apple   
    kikcitRouter.post('/userLogin', async (req, res) => {
        try {
        


            console.log("happend first")
        const userID = req.body.userID
        const token = req.body.deviceToken
        
        
        
        
        
        if(!userID) {
        
            throw new Error('UserID empty')
        }
        
        else {
        
            let foundUser = await userModel.find({userID: userID});
        
            let user = foundUser[0];
        
            
        
            if(token != "Device token not given") {
                user.deviceToken = token;
                
                let saved = await user.save()
        
                
                res.status(200).json({user: saved})
            }
        
            console.log(user)
        
            res.status(200).json({user: user})
        
        }
        
        
        
        }
        catch(error) {
        
            res.status(400).json({message: error.message})
        
        }
        
        
        });




   


    



//BusinessUser Login
        kikcitRouter.post('/businessUserLogin', async (req, res) => {
            try {
            

                console.log("happend first")

            const userID = req.body.userID
            const token = req.body.deviceToken
            
            
            
            //console.log(`this should be body from login ${req.body.userID}`)
            
            if(!userID) {
            
                throw new Error('UserID empty')
            }
            
            else {
            
                let foundUser = await businessUserModel.find({userID: userID});
            
                let user = foundUser[0];
            
                
            
                if(token != "Device token not given") {
                    user.deviceToken = token;
                    
                    let saved = await user.save()
            
                    
                    res.status(200).json({user: saved})
                }
            
                console.log(user)
            
                res.status(200).json({user: user})
            
            }
            
            
            
            }
            catch(error) {
            
                res.status(400).json({message: error.message})
            
            }
            
            
            });




//Create business/Update Business



kikcitRouter.post("/createBusiness",   async function(req,res) {
    try {

       
        let newBusiness = req.body;
        let objectID = newBusiness.id
        
        
        let userID = newBusiness.userID
        

      

        if(userID == "" || userID == null || userID == undefined) {
            console.log("Could not make new business No userID found")
            throw new Error("Could not make new business No User ID found")
        }


    
        

        //If business has not been found, create new business
        if(objectID == "" || objectID == null || objectID == undefined) { 
            
            try {
            
                newBusiness.didCreateBusiness = true

        let business = await businessModel.create({ didCreateBusiness: newBusiness.didCreateBusiness, profileImage: newBusiness.profileImage, businessName: newBusiness.businessName, businessAddress: newBusiness.businessAddress, businessType: newBusiness.Type, businessPhone: newBusiness.phone,
            businessWebsite: newBusiness.businessWebsite, businessHours: newBusiness.businessHours, businessAbout: newBusiness.businessAbout, kikcitPoints: newBusiness.kikcitPoints, consumerCategory: newBusiness.consumerCategory,  localRecommendationCategory: newBusiness.localRecommendationCategory, latitude: newBusiness.latitude, longitude: newBusiness.longitude, userID: newBusiness.userID });

            
                 

        let user = await businessUserModel.findOneAndUpdate(
            { userID: business.userID }, 
            { $set: {"businessID": business._id} },
            { new: true } // Return the updated document
          );

            console.log(`created new business ${business}`)
            console.log(`updated user with business  ${user}`)
            

          return res.status(201).json({business: business});


        } 
        
        catch (error) {

            throw new Error(`Could not make new business Error:${error.message}`)
        };
    }
  
        
    }

    catch(error) {
        res.status(400).json({message: error.message})
    }
});



//Get single business for user
kikcitRouter.get("/singleBusiness/:businessID", async function(req, res) { 

    try{

        let businessID = req.params.businessID;

        

        let businessArr = await businessUserModel.find({_id: businessID})

        let business = businessArr[0]


        console.log(`loading business from single business function:${business}`)
        return res.status(201).json({business: business})

    }

    catch(error) {
        res.status(400).json({message: error.message})
    }

});



//Get all businesses for category
kikcitRouter.get("/getCategoryBusiness/:consumerCategory", async function(req, res) { 

    try{

        let consumerCategory = req.params.consumerCategory;

        

        let businessArr = await businessModel.find({consumerCategory: consumerCategory})

        


        console.log(`loading business from single business function:${business}`)
        return res.status(201).json({businesses: businessArr})

    }

    catch(error) {
        res.status(400).json({message: error.message})
    }

});



//submit  user quiz
kikcitRouter.post("/submitQuiz", async (req, res) => {

    try {
        const user = req.body.user
    
    if(!user.userID) {
            
        throw new Error('UserID empty')
    }
    
    else {
    
        let foundUser = await businessUserModel.find({userID: user.userID});
 
        
    
        let oldUser = foundUser[0];

        oldUser.consumerCategory = user.consumerCategory
        oldUser.consumerPersona = user.consumerPersona
        oldUser.didCompleteQuiz = true
    
       let savedUser = await oldUser.save()
    
       let user = savedUser
        
    
        res.status(200).json({user: user})
    
    }
    
    
    
    }
    catch(error) {
    
        res.status(400).json({message: error.message})
    
    }
    
    
    });





    //Upload single image
kikcitRouter.post('/imageUpload/:userID', upload, async (req, res) => {
    // Check if the file is received
    if (!req.file) {
        console.log("no file")
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    try {
 
        

        console.log("tried to upload image")
     


        //Grab file
        const file = req.file;

        //format file name
        const timeStamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}-${timeStamp}.${type}`;

        //Create reference for file name in cloud storage

        const imageRef = ref( defaultStorage,`images/${fileName}`);

        //Upload file in the bucket storage
        const snapshot = await uploadBytesResumable(imageRef, file.buffer, { contentType: file.mimetype })

        //Get public url
        const imageURL = await getDownloadURL(snapshot.ref);

       
    

        
        console.log(`image uploaded, here's the url:${imageURL}`)
        //find the business
        let userID = req.params.userID;

        let updatedBusiness = await businessModel.findOneAndUpdate({userID: userID}, {$set: {profileImage: imageURL}}, {new: true});



        


      



        // Send response back
        res.status(200).json({

            business: updatedBusiness
          
        });


    } catch (error) {
        console.error("Error uploading to Firebase:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading image"
        });
    }
});



    module.exports = {
        kikcitRouter
    }