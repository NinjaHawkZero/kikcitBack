require('dotenv').config()

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const {PORT} = require("./config");
var multer = require("multer");
const { kikcitRouter } = require("./Routes/routes")




mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection




db.on('error', (error) => console.error(error))

db.once('open', () => console.log("Connected To Database"))


app.use(express.json())



app.use('/kikcit', kikcitRouter)


  






app.listen(PORT, process.env.IP, function() {
    console.log("The Kikcit server has started!")
})