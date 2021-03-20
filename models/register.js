//require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},{timestamps: true});

//methods when working with an instance of Schema 
playerSchema.methods.generateAuthToken = async function(){
    try{

        const token =  jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY)//change secret key with min 32 letters
        this.tokens= this.tokens.concat({token:token})
        this.save();
        
        return token;
    }catch(error){

    }
}

                        //run this fn befor "save" 
playerSchema.pre("save",async function(next){ //next -> middleware
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    }
    next(); 
})

const users = new mongoose.model('Registration', playerSchema);
module.exports = users;