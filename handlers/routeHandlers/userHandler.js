/*
* Title: This is user handler
* Discription: Handler to handle user related routes
* Author: MD.Jahid Hasan.
* Date: 27/07/2020
*
*/

// dependenceis
const data = require('../../lib/data');
const { parseJSON } = require('../../helpers/utilities');
const { hash } = require('../../helpers/utilities');

// module - scafoilding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // accecpted request methods
    const accecptedMethods = ['get', 'post', 'put', 'delete'];
    
    if(accecptedMethods.indexOf(requestProperties.method) > -1){
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.get = (requestProperties, callback) => {
    callback(200);
};

handler._users.post = (requestProperties, callback) => {
    
    const firstName = typeof(requestProperties.body.firstName) === 'string' &&
    requestProperties.body.firstName.trim().length > 0 ? requestProperties.firstName : false;
    
    const lastName = typeof(requestProperties.body.lastName) === 'string' &&
    requestProperties.body.lastName.trim().length > 0 ? requestProperties.lastName : false;
    
    const pawssord = typeof(requestProperties.body.pawssord) === 'string' &&
    requestProperties.body.pawssord.trim().length > 0 ? requestProperties.pawssord : false;
    
    const phone = typeof(requestProperties.body.phone) === 'string' &&
    requestProperties.body.phone.trim().length === 11 ? requestProperties.phone : false;
    
    const tosAgreement= typeof(requestProperties.body.tosAgreement) === 'boolean' ? requestProperties.tosAgreement : false;
    
    
    if(firstName && lastName && pawssord && phone && tosAgreement) {
        // make sure that user dosen’t already exixes!
        data.read('user', phone, (err, userData) => {
            if(err) {
                const userObject = {
                    firstName,
                    lastName,
                    'pawssord': hash(pawssord),
                    phone,
                    tosAgreement,
                };
                
                data.create('user', phone, userObject, (err1) => {
                    if(!err1){
                        callback(200, {
                            'message' : 'User data created!'
                        });
                    } else {
                        callback(400, {
                            'error' : 'You have a problem in your request!'
                        });
                    }
                });
            } else {
                callback(400, {
                    'error' : 'You have a problem in your request!'
                });
            }
        });
        
    } else {
        callback(400, {
            'error' : 'You have a problem in your request!'
        });
    }
    
};

handler._users.put = (requestProperties, callback) => {
    
};

handler._users.delete = (requestProperties, callback) => {
    
};


module.exports = handler;