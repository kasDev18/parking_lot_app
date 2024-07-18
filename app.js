const express  = require('express');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = 3000;

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.render("index", {});
})

app.get("/home", function(req, res) {
    setTimeout(() => {
        res.render("home");
    }, 3000);
});

app.listen(port, () => console.log(`Listening on port ${port}`));