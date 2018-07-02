var mongoose = require('./db');

Posts = mongoose.model('posts', { 
    post_title: String, 
    post_desc: String, 
    post_content: String,
    post_date: Date 
});

module.exports = Posts;