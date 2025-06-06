const { mongoose } = require("mongoose");

const branchSchema = mongoose.Schema({
    branch_name: String,
    state: String,
    city: String,
    pincode: Number
});

const branchModel = mongoose.model('branch', branchSchema);

module.exports = branchModel;