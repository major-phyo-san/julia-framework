module.exports.index = function(req, res){
 res.send("Listing one user");
}

module.exports.indexAll = function(req, res){
    res.send('Listing all users');
}