const { mongoose, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    uname: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    city: String,
    state: String,
    pincode: Number,
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;

