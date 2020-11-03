// this module provides storage option for multer file uploads
// created on 03-11-2020

var multer = require('multer');
var path = require('path');
var stringGenerator = require('./randomstrings');

// defines root for the uploaded files (storage root)
const baseDir = './storage/app';

var makeFileStorage = function(dir){
    // full directory to the storage root plus user provided 'dir' directory
    var fullDir = path.join(baseDir, dir);

    // relative directory of the storage root respective to the running process's CWD
    var relativeDir = path.relative(process.cwd(), fullDir);
    
    var storage = multer.diskStorage({
        destination: function(req, file, cb){
            // uploaded files will be stored in the storage root plus user provided 'dir' directory
            cb(null, relativeDir);
        },
        filename:function(req, file,cb){
            // we'll rename every file with the 3 chunks of 5-character strings
            var randomFileName = stringGenerator(5) + '_' + stringGenerator(5) + '_' + stringGenerator(5);
            cb(null, randomFileName + path.extname(file.originalname));
          }
    });
    
    return storage;
}

module.exports = makeFileStorage;