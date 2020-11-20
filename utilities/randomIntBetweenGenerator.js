// this module generates a random INTEGER number between the min and max (inclusive) values
// created on 20-11-2020

var generator = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}