const { mongoose } = require("mongoose");

const staffSchema = mongoose.Schema({
    email: String,
    phone: String,
    password: String,
    working_branch_id: Object,
    salary: Number,
    designation: String,
});

const staffModel = mongoose.model('staff', staffSchema);

module.exports = staffModel;