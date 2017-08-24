const express = require('express');
const fs = require('fs');
const xmlhttp = require('xmlhttprequest');
const mustache = require('mustache');
let app = express();
let http = require('http');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [];

app.post("/event/add", function(req, res) {
    let name = req.body.name;
    let place = req.body.place;
    //console.log(name);
    let event = {
        "name": name,
        "place": place
    };
    events.push(event);
    //console.log(events);
    res.send('<a href="/">Event added</a>');
});

app.delete("/event/del", function(req, res, next) {
    console.log(events);
    console.log(req.body);
    //N fonctionn pas
    for (let i = 0; i < events.length; i++) {
        events.splice(req.body.id[i], 1);
    } //modifier pour que supprime le bon
    console.log(events);
    //events.splice(req.body);
});

app.get("/", function(req, res) {
        res.render('index.html', {
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
app.use("/", express.static("static"));

app.listen(80, "localhost", function() {
    console.log('Listening port 80 !');
})