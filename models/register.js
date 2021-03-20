const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

                        //run this fn befor "save" 
playerSchema.pre("save",async function(next){ //next -> middleware
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    }
    next(); 
})

const users = new mongoose.model('Registration', playerSchema);
module.exports = users;