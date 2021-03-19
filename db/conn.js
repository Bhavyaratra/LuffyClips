const e = require("express");
const mongoose = require ("mongoose");

const dbURI = "mongodb+srv://hellhole:test1234@luffyclips.wmafh.mongodb.net/luffyclip?retryWrites=true&w=majority";
mongoose.connect(dbURI,{
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