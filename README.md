# react+redux+react-router --demo
	
    根据redux的一个异步请求[Examples](https://github.com/reactjs/redux/tree/master/examples/async)中的一个demo，
    用react-router-redux(https://baidu.com)来管理路由状态做成的一个简单的例子。
    例子用的redux中的案例方便初学者读懂怎么与redux结合。
    

###1.初始化

	npm init

###2.开发环境

	npm start
	
	用webpack构建，采用热加载[webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)和内存缓存中间件[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

###3.生产环境

	npm run build
	
	采用文件hash值替换的方式来更好地部署，具体插件看 webpack.config.prod
    
##参考资料
	
	[react](https://github.com/facebook/react)
    [redux](https://github.com/reactjs/redux)
	[redux-tutorial-cn](https://github.com/react-guide/redux-tutorial-cn)
    [redux-in-chinese](http://camsong.github.io/redux-in-chinese/)
    热加载参考项目[react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
    [react社区](http://react-china.org/)