import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool } from '../Tool';
import { target } from '../Config/Config';
require ('jquery-lazyload');
require('../Js/lib/medium-zoom.min.js');

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData:{post_content: '<div class="loading-wrap"></div>', post_date: '2016-10-28'}
        }
        this.delete = () => {
            if (confirm('确定要删除该文章？')) {
                location.href = target + 'api/delete?postid=' + this.state.articleData._id
            }
        }
    }
    render() {
        return (
            <div className="archive">
                <div className="view-header">
                    <h1 className="title">{this.state.articleData.post_title}</h1>
                    <p className="desc">{this.state.articleData.post_desc}</p>
                    <p className="date">{Tool.formatDate(this.state.articleData.post_date, 1)}</p>
                </div>
                <article className="content">
                    <div className="main-content" dangerouslySetInnerHTML={{__html: this.state.articleData.post_content}}>
                    </div>
                    {sessionStorage.username == 'wenqi' 
                    ? 
                        <div>
                            <Link className="btn btn-primary" to={`/update/${this.state.articleData._id}`}>修改</Link>
                            <a className="btn btn-secondary" onClick={this.delete}>删除</a>
                        </div>
                    :
                        <span></span>
                    }
                </article>
            </div>
        );
    }
    componentDidMount(){
        scrollTo(0, 0);
        var that = this;
        Tool.jsonp({
            url: 'api/view',
            key: 'callback',
            data: {
                postid: that.props.params.postid
            },
            callback: function(ret) {
                ret[0].post_content = ret[0].post_content.replace(/src=/g, 'data-original=');
                console.log('content:' + ret[0]);
                that.setState({articleData: ret[0]});
            }
        })
    }
    componentDidUpdate() {
        hljs.initHighlighting();
        $('img').lazyload();
        mediumZoom('.main-content img');
    }
}

export default Archive;

