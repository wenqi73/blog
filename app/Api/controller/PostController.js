var ObjectID = require('mongodb').ObjectID;
var Posts = require('../model/posts');

module.exports = { 
    feed: function(req, res, next) {
        Posts.find(function(err, data) {
            if (err) return console.error(err);
            res.data = data;
            return next();
        })
    },

    list: function(req, res, next) {
        Posts.find(function(err, data) {
            if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.end(req.query.callback  + '(' + JSON.stringify(data) + ')');
        })
    },
    
    create: function (req, res, next) {
        new Posts(req.body).save( function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('新增文章：' + req.body.post_title);
            }
            res.redirect('/');
        });
    },

    view: function(req, res, next) {
        Posts.find({_id: ObjectID(req.query.postid)}, function(err, data) {
            if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.end(req.query.callback + '(' + JSON.stringify(data) + ')');
        })
    },

    update: function(req, res, next) {
        Posts.update(
            {_id: ObjectID(req.body.post_id)}, 
            {$set: { 
                post_title : req.body.post_title, 
                post_desc : req.body.post_desc,
                post_content: req.body.post_content 
            }}, function(err, result) {
                if (err) throw err;
                // react-router路径
                res.redirect('/view/' + req.body.post_id);
            }
        );
    },

    delete: function(req, res, next) {
        Posts.remove(
            {_id: ObjectID(req.query.postid)}, function(err, result) {
                if (err) throw err;
            }
        );
        res.redirect('/');
    },
}
