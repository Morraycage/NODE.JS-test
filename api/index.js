var express = require("express");
var https = require('https');
var fs = require('fs');
var app = express();

const datasource = "https://alivebyacadomia.github.io/headtohead.json";
const port = 3000;

app.get("/players/:playerId", async (req, res, next) => {
    const players = JSON.parse(await getData()).players;
    const p = players.find(player => player.id === parseInt(req.params.playerId));
    if (p) {
        res.json(p);
    } else {
        res.status(404).send('Not found');
    }
});

app.get("/players", async (req, res, next) => {
    const players = JSON.parse(await getData()).players;
    res.json(players.sort((a, b) => a.id - b.id));
});

async function getData() {
    return new Promise(rslv => {
        https.get(datasource, function (res) {
            let body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                rslv(body);
            });
        }).on('error', function (e) {
            rslv();
        });
    });
}

app.listen(port, () => {});
