/*
* Title: Handle req and res
* Discription: Handle the request and response
* Author: MD.Jahid Hasan
* Date: 25/07/2022
*
*/

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routers = require('../routers');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('../helpers/utilites');

// handlers object - module scaffolding
const handlers = {};

handlers.handleReqRes = (req, res) => {
    // response handle
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;
    
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    
    const chosenHandler = routers[trimmedPath] ? routers[trimmedPath] : notFoundHandler;
    
    // body data read
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    
    req.on('end', () => {
        realData += decoder.end();
        
        requestProperties.body = parseJSON(realData);
        
        // response handling
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
            
            //convert data to json
            const payloadedString = JSON.stringify(payload);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadedString);
        });
    });
};

module.exports = handlers;