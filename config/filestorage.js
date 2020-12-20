// this module provides storage option for multer file uploads
// created on 2020-11-03
// modified on 2020-12-01

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const stringGenerator = require('../utilities/stringGenerators');

// defines root for the uploaded files (storage root)
const baseDir = './storage/app';

module.exports.makeMulterStorage = function(dir){
    // full directory to the storage root plus user provided 'dir' directory
    const fullDir = path.join(baseDir, dir);

    // relative directory of the storage root respective to the running process's CWD
    const relativeDir = path.relative(process.cwd(), fullDir);
    
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            // create user provided directory if not exists
            fs.mkdirSync(relativeDir, {recursive: true});

            // uploaded files will be stored in the storage root plus user provided 'dir' directory            
            cb(null, relativeDir);
        },
        filename:function(req, file,cb){
            // we'll rename every file with the 3 chunks of 5-character strings
            const randomFileName = stringGenerator.generateRandomString(5)  + '_' + stringGenerator.generateRandomString(5) + '_' + stringGenerator.generateRandomString(5);
            cb(null, randomFileName + path.extname(file.originalname));
          }
    });
    
    return storage;
}