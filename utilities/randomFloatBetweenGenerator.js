// this module generates a random FLOAT number between the min and max (inclusive) values
// created on 20-11-2020

var generator = function(min, max){    
    return Math.random() * (max - min) + min;
}