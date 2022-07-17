import express from "express";
// const api = require('./api')
import * as api from './api.js';
let app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index"); // render the index.ejs file
});

app.get('/results', function(req, res){
    let Temptoconvert = req.query.convert;
    api.query(`${Temptoconvert}`, "FahrenheitToCelsiusResult")
    .then(xmlResult => res.render('results', {data: xmlResult}));
});

app.listen(process.env.PORT || 8080, process.env.IP, function () {
    console.log("Server is listening on http://localhost:8080");
});