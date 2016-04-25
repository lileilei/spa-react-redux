import './style.css' 
import React from 'react'

const Start = React.createClass({
  render: function() {
  	return (
          <div className="animated fadeIn" >
            <div className="contents">
              <h1>1、前期准备</h1>
              <p>MTUI React 组件是基于 React.js 开发的 ，如果你没有使用过 React，请先访问 <a href="https://facebook.github.io/react/index.html">React官网</a>学习。</p>
              <h1>2、获取源码</h1>
              <p>MTUI React 代码托管在Github，你可以点击下面的按钮获取。为了帮助项目更好的发展，请不吝献出你的 Star。</p>
              <p> <a href="https://github.com/mtsee/mtui-react">Github</a> </p>
              <h1>3、源码说明</h1>
              <p>
              组件源码在 dev/js/mtui下面，将该文件夹拷贝到自己的项目下面。<br/><br/>
              html模版建议：
              </p>
              <p id="code-shtml"></p>
            </div>
          </div>
      );
  }
});
//关于我们
module.exports = Start;