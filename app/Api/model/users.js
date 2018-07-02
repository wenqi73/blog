var mongoose = require('./db');

module.exports = mongoose.model('users', { 
    username: String, 
    password: String
});

