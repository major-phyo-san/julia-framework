const readline = require('readline');
const fs = require('fs');
const stringGenerator = require('./utilities/stringGenerators');
const cryptography = require('./utilities/cryptography');

var writeData = '';
var generatedKey = stringGenerator.generateRandomString(30);
generatedKey = cryptography.base64digest(generatedKey);

const readInterface = readline.createInterface({
    input: fs.createReadStream('.env'),
    console: false
});

readInterface.on('line', function(line){
    if(line.includes('NODE_KEY=')){
        line = '';
        line = 'NODE_KEY=' + generatedKey;
    }
    writeData += line + '\n';
});

readInterface.on('close', function(err){
    fs.writeFileSync('.env', writeData, function(err){
        console.log('Error generating Node application key');
    });
    console.log('Node application key generated successfully with : ' + generatedKey);
});

