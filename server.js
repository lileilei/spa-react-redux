var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var favicon = require('serve-favicon');

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
