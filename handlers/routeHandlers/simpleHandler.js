/*
* Title: This is simple handlers
* Discription: Simple handlers
* Author: MD.Jahid Hasan.
* Date: 25/07/2020
*
*/

// dependenceis

// module - scafoilding
const handler = {};

handler.simpleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is simple handler message',
    })
};

module.exports = handler;