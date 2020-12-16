const mongoose = require('mongoose');
const userSchema = require('../../database/migrations/userSchema');

var User = mongoose.model('User', userSchema);

module.exports = User;