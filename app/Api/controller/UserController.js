var Users = require('../model/users');

module.exports = { 
    login: function (req, res) {
         // 此乃异步，跳转必须在里面跳！
        Users.findOne({username: req.body.username}, function(err, data) {
            if (err){                                      
                res.send(500);
                console.log(err);
            } else if(!data){                                 
                console.log('用户名不存在');
                res.send(200, { error: '用户名不存在'});
            } else { 
                if (req.body.password != data.password){    
                    console.log('密码错误');
                    res.send(200, { error: '密码错误'});
                } else {   
                    console.log(data)    
                    res.header('Content-Type', 'application/json;charset=utf-8');                     
                    res.send(200, {username: data.username});
                }
            }
        })
    }
}
