import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import ReactDOM, { render } from 'react-dom'
import './Style/lib/iconfont.js'
import './Style/lib/atelier-forest-light.css'
import './Style/lib/simditor.css'
import './Style/site.less'

// 按需加载
const rootRoute = {
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
        cb(null, require('./Component/Main').default)
        }, 'Main')
    },
    indexRoute: {
        getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Component/Index').default)
        }, 'Index')
        },
    },
    childRoutes: [
        {
            path: 'view/:postid',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                cb(null, require('./Component/View').default)
                }, 'View')
            }
        },
        {
            path: 'update/:postid',
            onEnter(nextState, replaceState) {
                if (!sessionStorage.username || sessionStorage.username == undefined) {
                    replaceState('/signin');
                } 
            },
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                cb(null, require('./Component/Update').default)
                }, 'Update')
            }
        },
        {
            path: 'create',
            onEnter(nextState, replaceState) {
                if (!sessionStorage.username || sessionStorage.username == undefined) {
                    replaceState('/signin');
                } 
            },
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                cb(null, require('./Component/Create').default)
                }, 'Create')
            }
        },
        {
            path: 'signin',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                cb(null, require('./Component/Signin').default)
                }, 'Signin')
            }
        },
    ]
}

render((
    /*<Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Index}/>
            <Route path='view/:postid' component={View} />
            <Route path='update/:postid' component={Update} />
            <Route path='create' onEnter={requireAuth} component={Create} />
            <Route path='signin' component={Signin} />
        </Route>
    </Router>*/
    <Router history={browserHistory} routes={rootRoute}>
    </Router>
    ),
    document.getElementById('app')
)

