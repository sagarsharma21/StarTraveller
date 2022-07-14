const express =require ("express");
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const app =express();

dotenv.config();
mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB connected successfully!");
}).catch((err)=>console.log(err));


app.listen(9000, ()=>{
    console.log("Backend server is running!");
});