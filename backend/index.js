const express =require ("express");
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const app =express();
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB connected successfully!");
}).catch((err)=>console.log(err));


app.use("/api/pins", pinRoute);


app.listen(9000, ()=>{
    console.log("Backend server is running!");
});

