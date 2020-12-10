// this module generates a random string based on the 'length' value
// created on 03-11-2020

const uuid = require('uuid');

module.exports.generateRandomString = function (length) {
   // result will be the generated string
   var result = '';

   // characters that will be included in the generated strings
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      // generate each character randomly
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// module to generate uuid v4
module.exports.generateUUID = function(){
   return uuid.v4();
}