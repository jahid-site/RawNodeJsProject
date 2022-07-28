/*
* Title: This is 404 notFound handlers
* Discription: Not found handlers
* Author: MD.Jahid Hasan.
* Date: 25/07/2020
*
*/

// dependenceis

// module - scafoilding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: 'This is 404 not found handler message',
    });
};

module.exports = handler;