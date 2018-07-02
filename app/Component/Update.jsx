import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import { target } from '../Config/Config';

class ArchiveUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData:{ _id:'', post_title:'', post_desc:'', post_content:''}
        }
        this.titleChange = (e) => {
            this.setState ({post_title: e.target.value});
        }
        this.descChange = (e) => {
            this.setState ({post_desc: e.target.value});
        }
        this.contentChange = (e) => {
            this.setState ({post_content: e.target.value});
        }
    }
    render() {
        return (
            <div>
                <form method="post" id="form" action="/api/update">
                    <input name="post_id" type="hidden" value={this.state.post_id}/>
                    <div className="form-group">
                        <input type="text" name="post_title" className="write-title" id="inputTitle" placeholder="题目"  value={this.state.post_title} onChange={this.titleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="post_desc" className="form-control" id="inputDesc" placeholder="简介"  value={this.state.post_desc} onChange={this.descChange}/>
                    </div>
                    <div className="form-group">
                        <section className="editor-content-wrap">
                            <textarea type="text" name="post_content" className="form-control" id="editor" placeholder="内容" value={this.state.post_content} onChange={this.contentChange}>
                            </textarea>
                        </section>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">修改</button>
                    </div>
                </form>
            </div>
        );
    }
    componentDidMount(){
        var that = this;
        Tool.jsonp({
            url: 'api/view',
            key: 'callback',
            data: {
                postid: that.props.params.postid
            },
            callback: function(ret) {
                that.setState({
                    post_id: ret[0]._id, 
                    post_title: ret[0].post_title, 
                    post_desc: ret[0].post_desc, 
                    post_content: ret[0].post_content
                });
                var editor = new Simditor({
                    textarea: $('#editor'),
                    toolbar : [
                                'title',
                                'bold',
                                'italic',
                                'underline',
                                'fontScale',
                                'color',
                                'ol'     ,       
                                'ul'    ,        
                                'blockquote',
                                'code'     ,     
                                'link',
                                'image',
                                'hr'    ,   
                                ],  //工具栏
                    upload : {
                        url : '/upload', //文件上传的接口地址
                        params: {name: 'file'}, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
                    } 
                })
            }
        })
    }
}

export default ArchiveUpdate;

