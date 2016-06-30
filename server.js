var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var favicon = require('serve-favicon');
var path = require('path');
var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
}))
app.use(webpackHotMiddleware(compiler))



app.use(favicon('./favicon.ico'));

//样式
app.get(/^(\/\w+)*\/(\w+)\.css(\?\S*)?$/, function(req, res) {
    var url = req.url;
    var src = url.replace(/(\/)(\S+)(\.css)(\?\S*)?/, '$2')+'.css';
    res.sendFile(path.join(__dirname,src ));
});
//样式
app.get(/^(\/\w+)*\/(\w+)\.css.map(\?\S*)?$/, function(req, res) {
    var url = req.url;
    var src = url.replace(/(\/)(\S+)(\.css.map)(\?\S*)?/, '$2')+'.css.map';
    res.sendFile(path.join(__dirname,src ));
});
//图片
app.get(/^(\/\w+)*\/(\w+)\.(png|gif|jpg)(\?\S*)?$/, function(req, res) {
    var url = req.url;
    var src = url;
    res.sendFile(path.join(__dirname,src ));
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/view/index.html')
});
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==>   Listening on port", port)
    }
});
