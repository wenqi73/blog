import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = () => {
            sessionStorage.username = '';
            browserHistory.push('/');
        },
        this.scrollTop = () => {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return (
            <header className="header" id="seven-header">
                <nav className="nav-container">
                    <div className="pull-left">
                        <a className="header-title" href="/">
                            Home
                        </a>
                        {sessionStorage.username == 'wenqi' 
                        ? 
                        <span>
                          <Link className="header-title" to={`/create`}>
                            创建
                          </Link>
                          <a className="header-title" onClick={this.logout} href="javascript:;">
                            登出
                          </a>
                        </span>
                        :
                          <span></span>
                        }
                        
                    </div>
                    <div className="pull-right">
                        <a href="https://github.com/wenqi1028/blog-react" className="nav-icon" target="_blank">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-github"></use>
                            </svg>
                        </a>
                        <a href="https://twitter.com/seven_waizui" className="nav-icon" target="_blank">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-twitter"></use>
                            </svg>
                        </a>
                        <a href="http://weibo.com/u/1576108413" className="nav-icon" target="_blank"> 
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-weibo"></use>
                            </svg>
                        </a>
                        
                        <a href="/feed" className="nav-icon" target="_blank">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-feed"></use>
                            </svg>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <main className="article-container">
                    {this.props.children}
                </main>
                <a id="back_top">
                    <img src="/img/backtop.png" alt=""/>
                </a>
                <footer>
                    © Copyright 2017 Seven
                </footer>
            </div>
        );
    }
}

export default Main;

