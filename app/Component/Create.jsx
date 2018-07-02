import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tool } from '../Tool';
import { target } from '../Config/Config';

class ArchiveCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {post_title:'', post_desc:'', post_content:'', post_date: new Date()}
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
                <form method="post" id="form" action="/api/create">
                    <input type="hidden" name="post_date" value={this.state.post_date} />
                    <div className="form-group">
                        <input type="text" name="post_title" className="write-title" id="inputTitle" placeholder="标题"  value={this.state.post_title} onChange={this.titleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="post_desc" className="write-title write-desc" id="inputDesc" placeholder="简介"  value={this.state.post_desc} onChange={this.descChange}/>
                    </div>
                    <div className="form-group">
                        <section className="editor-content-wrap">
                            <textarea type="text" name="post_content" className="form-control" id="editor" placeholder="内容" value={this.state.post_content} onChange={this.contentChange}>
                            </textarea>
                        </section>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">确定</button>
                    </div>
                </form>
            </div>
        );
    }
    componentDidMount(){
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
                url : target + 'upload', //文件上传的接口地址
                params: {name: 'file'}, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            } 
        })
    }
}

export default ArchiveCreate;



