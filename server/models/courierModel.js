const { mongoose } = require("mongoose");

const courierSchema = mongoose.Schema({
    sender_id: Object,
    rec_name: String,
    rec_email: String,
    rec_phone: String,
    rec_address: String,
    rec_city: String,
    rec_state: String,
    rec_pincode: String,
    courier_weight: Number,
    courier_detail: String,
    pickup_date: Date,
    delivery_date: Date,
    charges: Number,
    delivery_status: String,
});

const courierModel = mongoose.model('courier_deliveries', courierSchema);

module.exports = courierModel;