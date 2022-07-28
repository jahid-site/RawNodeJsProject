/*
* Title: Handle utilities
* Discription: Handle all utilities functions
* Author: MD.Jahid Hasan
* Date: 27/07/2022
*
*/

// dependencies
const crypto = require('crypto');
const environment = require('./environments');

// module - scaffoilding
const handler = {};

handler.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch (e) {
        output = {};
    }
    return output;
};

handler.hash = (str) => {
    const hash = crypto.createHmac('sha256', environment.hashSecretKey)
        .update(str)
        .digest('hex');
    return hash;
};

// export module
module.exports = handler;