import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool } from '../Tool';

class Archives extends Component {
    constructor(props) {
        super(props);
        console.log(this)
        this.state = {
            articleData:[]
        }
    }
    render() {
        return (
            <section className="archives">
                {
                    this.state.articleData.map((item,key) => {
                        return (
                        <article className="item" key={key}>
                            <span className="date" href="#">
                                <time>{Tool.formatDate(item.post_date, 0)}</time>
                            </span>
                            <h2 className="title" id="pjax-container">
                                <Link to={`/view/${item._id}`}>{item.post_title}</Link>
                            </h2>
                            <div className="summary">
                                <p>{item.post_desc}</p>
                            </div>
                        </article>)
                    })
                }
            </section>
        );
    }
    componentWillMount() {
        // NProgress.start()
    }
    componentDidMount() {
        var that = this;
        Tool.jsonp({
            url: 'api/archives',
            key: 'callback',
            callback: function(ret) {
                console.log(ret);
                that.setState({articleData: ret});
                // NProgress.done();
            }
        })
        // $(document).pjax('a', '#pjax-container');
    }
}

class Introduce extends Component {
    render() {
        return (
            <section className="intro">
                <img className="my-img" src="img/ava.png" />
                <h1 className="my-name">Seven</h1>
                <div className="divider"></div>
                <h3 className="my-sign">摇一年拐一年猿粪啊，吃一堑长一智谢谢啊</h3>
            </section>
        );
    }
}

class Index extends Component {
    render() {
        return (
            <div>
                <Introduce/>
                 <Archives/>
            </div>
        );
    }
}
export default Index;

