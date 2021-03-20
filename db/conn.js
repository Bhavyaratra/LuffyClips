// require('dotenv').config();
const e = require("express");
const mongoose = require ("mongoose");

mongoose.connect(process.env.dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

})
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})