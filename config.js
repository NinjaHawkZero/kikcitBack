"use strict"




let dotenv = require("dotenv");
require("colors");

//Extract env items
dotenv.config({path: __dirname + '/.env'});


 const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


   
   

const PORT = process.env.PORT || 3001









//Use dev db, testing db, or via env variable, production db

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")

    ? "kikcit_Test"
    : process.env.DATABASE_URL || "kikcit";
}


const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;






console.log("OnTheBlock Config:" .green);
console.log("SECRET_KEY:" .yellow, SECRET_KEY);
console.log("PORT:" .yellow, PORT.toString());
//console.log("BCRYPT_WORK_FACTOR:" .yellow, BCRYPT_WORK_FACTOR);
console.log("Database:" .yellow, getDatabaseUri());
console.log("---")


module.exports = {
    SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri, firebaseConfig: { 
        apiKey: process.env.apiKey || "apiKey",
        authDomain: process.env.authDomain || "authDomain",
        databaseURL: process.env.databaseURL || "databaseURL",
        projectId: process.env.projectId || "projectId",
        storageBucket: process.env.storageBucket || "storageBucket",
        messagingSenderId: process.env.messagingSenderId || "messagingSenderId",
        appId: process.env.appId || "appId"

    }
}