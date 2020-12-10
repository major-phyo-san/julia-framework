// this module generates random numbers between the min and max (inclusive) values
// update to older randomFloatBetweenGenerator and randomIntBetweenGenerator modules
// created on 10-12-2020

module.exports.generateRandomInt = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.generateRandomFloat = function(min, max){
    return Math.random() * (max - min) + min;
}