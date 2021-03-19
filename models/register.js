const mongoose = require('mongoose')
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

const users = new mongoose.model('Registration', playerSchema);
module.exports = users;