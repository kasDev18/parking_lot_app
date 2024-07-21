const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    entry: String,
    type: String,
    time_hrs: Number,
    time_mins: Number,
    stay_hours: Number,
    hourly_rate: Number,
    day_rate: Number,
    subtotal: Number,
    tax: Number,
    total: Number
});

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;