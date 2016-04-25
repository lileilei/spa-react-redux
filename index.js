import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute,browserHistory,Link} from 'react-router' // ·��
import { syncHistoryWithStore } from 'react-router-redux' //·��ʹ��redux����
require('./style.less');
require('./animate.css');
const store = configureStore()
//������ʷͬ��
const history = syncHistoryWithStore(browserHistory, store)
const framework = React.createClass({
  render() {
    return (
        <div className="menu">
            <Link className="" to="/">异步请求的案例</Link>
            <Link className="" to="/Start">首页</Link>
            <Link className="" to="/list">列表页</Link>
            {this.props.children}
        </div>
    );
  }
});
import Start from './containers/Start';
import list from './containers/list/Index';

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={framework}>
          <IndexRoute component={App} />
          <Route path="index" component={App}/>
          <Route path="start" component={Start}/>
          <Route path="list" component={list}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
)
