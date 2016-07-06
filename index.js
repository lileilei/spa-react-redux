/**
 * Created by lilei on 2016/7/6.
 */
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

/* 组件 */
require('./style/animate.css');
require('./style/yh.css');
import  login from './containers/layout/Login'

import Start from './containers/Start';
import list from './containers/list/Index';
import  react from './containers/fetchDemo/react'
const framework = React.createClass({
    render() {
        return (
            <div id="root">
                {this.props.children}
            </div>
        );
    }
});

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={framework}>
                <IndexRoute component={login}/>
                <Route path="index.html" component={login}/>
                <Route path="yh" component={App}>
                    <Route path="react" component={react}/>
                    <Route path="start" component={Start}/>
                    <Route path="list" component={list}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('body')
);
