const express  = require('express');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const path = require('path');

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
    const {entry} = req.body;

    setTimeout(() => {
        res.render("vehicle/type", {entry: entry});
    }, delay);
});

app.post("/vehicle/payment", function(req, res) {
    const {entry, vehicle_type} = req.body;
    // console.log(vehicle_type);
    setTimeout(() => {
        res.render('vehicle/payment', {entry: entry, vehicleType: vehicle_type});
    }, delay)
});


app.listen(port, () => console.log(`Listening on port ${port}`));