const express = require('express');
const fs = require('fs');
const xmlhttp = require('xmlhttprequest');
const mustache = require('mustache');
const bodyParser = require('body-parser');
let app = express();
let http = require('http');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [{ name: "toto", place: "tata" }, { name: "titi", place: "tutu" }];

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
    res.send(event);
});

app.delete("/event/del", function(req, res, next) {
    //console.log(events);
    //console.log(req.body);
    console.log(req.body.id);
    for (let i = 0; i < events.length; i++) {
        if (req.body.id == events[i].name) {
            console.log(events[i]);
            res.send(events[i]);
            events.splice(i, 1);
            return;
        }
    }

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

//rajouter codes d'erreur