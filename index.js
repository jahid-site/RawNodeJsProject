/*
* Title: This is my first raw nodejs projects
* Discription: Raw nodejs projects
* Author: MD.Jahid Hasan.
* Date: 25/07/2020
*
*/

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port:${environment.port}`);
    });
};

// handle Request and Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();