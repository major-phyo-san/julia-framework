var multer = require('multer');
var path = require('path');

var baseDir = '../storage/app';

var makeFileStorage = function(dir){
    var fullDir = path.join(baseDir, dir);
    var relativeDir = path.relative(process.cwd(), fullDir);
    //console.log(fullDir);
    //console.log(relativeDir);
    var storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, relativeDir);
        },
        filename: function(req, file, cb){            
            cb(null, file.originalname);
        }
    });
    
    return storage;
}

module.exports = makeFileStorage;