var multer = require('multer');
var path = require('path');
var stringGenerator = require('./randomstrings');

const baseDir = './storage/app';

var makeFileStorage = function(dir){
    var fullDir = path.join(baseDir, dir);
    var relativeDir = path.relative(process.cwd(), fullDir);
    
    var storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, relativeDir);
        },
        filename:function(req, file,cb){
            var randomFileName = stringGenerator(5) + '_' + stringGenerator(5) + '_' + stringGenerator(5);
            cb(null, randomFileName + path.extname(file.originalname));
          }
    });
    
    return storage;
}

module.exports = makeFileStorage;