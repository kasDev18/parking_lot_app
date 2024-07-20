const express  = require('express');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const path = require('path');
const { time } = require('console');

const app = express();

const port = 3000;
const delay = 1000;

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('vehicle'));

app.get('/', (req, res) => {
    res.render("index", {});
})

app.get("/entry", function(req, res) {
    setTimeout(() => {
        res.render("entry");
    }, 3000)
});

// app.get("/vehicle/type", function(req, res) {
//     res.render("vehicle/type");
// });

app.post("/vehicle/type", function(req, res) {
    var {entry} = req.body;

    setTimeout(() => {
        res.render("vehicle/type", {entry: entry});
    }, delay);
});

app.post("/vehicle/payment", function(req, res) {
    var {entry, vehicle_type, hourly_rate} = req.body;
    var err_message = false;

    setTimeout(() => {
        res.render('vehicle/payment', {entry: entry, vehicleType: vehicle_type, hourlyRate: hourly_rate, errMessage: err_message});
    }, delay)
});

app.post("/vehicle/receipt", function(req, res) {
    var {entry, vehicle_type, time_hrs, time_mins, hours_stay, rate, hourly_rate} = req.body;
    var exceedHalfHrs = parseInt(time_hrs) + 1;
    var defaultSetHrs = parseInt(time_hrs);
    var defaultSetMins = parseInt(time_mins);
    var defaultHourlyRate = parseInt(hourly_rate);
    var dayRate = 5000;
    var dayHours = 24;
    var defaultHrs = 3;
    var defaultMin = 0;
    var defaultHalfHr = 30;
    var defaultRate = 40;
    var days;
    var getPositiveDiff;
    var getPositiveProd;
    var err_message = false;

    if(time_hrs && time_mins){
        if(defaultSetHrs == dayHours){
            if(defaultSetMins < defaultHalfHr){
                hours_stay = defaultSetHrs;
                rate = dayRate;
            }else{
                hours_stay = exceedHalfHrs;
                getPositiveDiff = hours_stay > dayHours ? (hours_stay - dayHours) : (dayHours - hours_stay);
                rate = dayRate + (getPositiveDiff * defaultHourlyRate);
            }
        }else{
            if(defaultSetHrs < dayHours){
                if(defaultSetHrs < defaultHrs){
                    // err_message = "Set hours cannot be less than 3";
                    // res.render('vehicle/payment', {entry: entry, vehicleType: vehicle_type, hourlyRate: hourly_rate, errMessage: err_message});
                    hours_stay = defaultSetHrs;
                    rate = defaultHourlyRate * defaultSetHrs;
                }else if(defaultSetHrs == defaultHrs && defaultSetMins == defaultMin){
                    hours_stay = defaultSetHrs;
                    rate = defaultRate;
                }else if(defaultSetMins < defaultHalfHr){
                    hours_stay = defaultSetHrs;
                    rate = hours_stay * defaultHourlyRate;
                }else{
                    hours_stay = exceedHalfHrs;
                    days = Math.floor((hours_stay / dayHours).toFixed(2));
                    getPositiveDiff = hours_stay > dayHours ? (hours_stay - dayHours) : (dayHours - hours_stay);
                    rate = hours_stay > dayHours ? (dayRate + (getPositiveDiff * defaultHourlyRate)) : (hours_stay == dayHours ? dayRate : (hours_stay * defaultHourlyRate));
                }
            }else if(defaultSetHrs > dayHours){
                if (defaultSetMins < defaultHalfHr) {
                    hours_stay = defaultSetHrs;
                    days = Math.floor((hours_stay / dayHours).toFixed(2));
                    getPositiveDiff = hours_stay > dayHours ? (hours_stay - dayHours) : (dayHours - hours_stay);
                    // rate = dayRate + (days + defaultHourlyRate);
                    rate = dayRate * days + (getPositiveDiff * defaultHourlyRate);
                    
                } else {
                    hours_stay = exceedHalfHrs;
                    days = Math.floor((hours_stay / dayHours).toFixed(2));
                    getPositiveProd = dayHours * days;
                    getPositiveDiff = hours_stay > getPositiveProd ? (hours_stay - getPositiveProd) : (getPositiveProd - hours_stay);
                    rate = (dayRate * days) + (getPositiveDiff * defaultHourlyRate);
                }
            }
        }
    }else{
        time_hrs = !time_hrs ? defaultHrs : defaultSetHrs;
        time_mins = !time_mins ? defaultMin : defaultSetMins
        rate = !time_hrs ? defaultHourlyRate : rate;
    }
    
    setTimeout(() => {
        res.render('vehicle/receipt', {entry: entry, vehicleType: vehicle_type, setHours: time_hrs, setMins: time_mins, stayHours: hours_stay, rate: rate});
    }, delay)
});


app.listen(port, () => console.log(`Listening on port ${port}`));