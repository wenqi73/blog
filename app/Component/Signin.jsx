import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Tool } from '../Tool';
import * as config from '../Config/Config';
const {target} = config;

class Signin extends Component {
    constructor(props) {
        super(props);
        this.login = (e) => {
            e.preventDefault(); 
            $.ajax({
                cache: true,
                type: 'POST',
                url: target + 'login',
                data: $('#form').serialize(),
                async: true,
                error: function(data) {
                    console.log(data);
                },
                success: function(data) {
                    console.log(data.username);
                    if (data.username != undefined) {
                        sessionStorage.username = data.username
                        console.log('sessionStorage.username:' + sessionStorage.username)
                        browserHistory.push('/')
                    }
                }
            });
        }
    }
    
    render() {
        return (
            <div>
                <form id="form" method="post" onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="inputName">用户名</label>
                        <input type="text" name="username" className="form-control" id="inputName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPwd">密码</label>
                        <input type="password" name="password" className="form-control" id="inputPwd" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">登录</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signin;

