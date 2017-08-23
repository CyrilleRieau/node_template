const express = require('express');

const fs = require('fs');

const mustache = require('mustache');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [];

app.post("/event/add", function(req, res) {
    let name = req.body.name;
    let place = req.body.place;
    console.log(req.body.name);
    let event = {
        name: name,
        place: place
    };
    events.push(event);
    console.log(events);
    res.send("event added");
});

app.get("/", function(req, res) {
        res.render('index', {
            db: events
        });
    })
    /*
        app.get("/", function(req, res) {
            res.render('index', {
                name: 'Cyrille',
                adjective: 'Amazing',
                nameList: db
            });
        })*/

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    });
});
app.set('views', './template');
app.set('view engine', 'html');
app.use("/", express.static("public"));

app.listen(80, "localhost", function() {
    console.log('Listening port 80 !');
})