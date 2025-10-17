//import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { app } from "./app.js"

import { google } from "googleapis";


//dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })


})
.catch((err) => {
    console.log("MongoDB Connections Failed!!", err);
})