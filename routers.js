/*
* Title: Routing request
* Discription: Routing all request
* Author: MD.Jahid Hasan.
* Date: 25/07/2020
*
*/

// dependenceis
const { simpleHandler } = require('./handlers/routeHandlers/simpleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

// module - scafoilding
const routers = {
    'simple': simpleHandler,
    'user': userHandler,
};

module.exports = routers;