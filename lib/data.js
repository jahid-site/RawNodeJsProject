// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data in the file
lib.create = (dir, file, data, callback) => {
    // write data to new file and close it
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDiscriptor) => {
        if(!err && fileDiscriptor){
            fs.writeFile(fileDiscriptor, JSON.stringify(data), (err2) => {
                if(!err2){
                    fs.close(fileDiscriptor, (err3) => {
                        if(!err3) {
                            callback(false);
                        } else {
                            callback('Error colseing the new file!');
                        }
                    });
                } else {
                    callback('Error write to new file');
                }
            });
        } else {
            callback('Could not create new file. file may already exsist!');
        }
    });
};

// read data in the file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// updateing data in the file
lib.update = (dir, file, data, callback) => {
    // update data to the file and close it
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDiscriptor) => {
        if(!err && fileDiscriptor){
            fs.ftruncate(fileDiscriptor, (err2) => {
                if(!err2){
                    fs.writeFile(fileDiscriptor, JSON.stringify(data), (err3) => {
                        if(!err3){
                            fs.close(fileDiscriptor, (err4) => {
                                if(!err4) {
                                    callback(false);
                                } else {
                                    callback('Error colseing the new file!');
                                }
                            });
                        } else {
                            callback('Error write to new file');
                        }
                    });
                } else {
                    callback('Error file truncateing!');
                }
            });
        } else {
            callback('Could not create new file. file may already exsist!');
        }
    });
};

// deleting file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if(err){
            callback(err);
        } else {
            callback('Error file deleteing!');
        }
    });
};

// module export
module.exports = lib;