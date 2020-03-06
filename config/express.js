const express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    session = require('express-session');

module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compression());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'pug');

    require('../app/routes/index.server.routes.js')(app);

    /*在使用pug的link(rel='stylesheet' href='/stylesheets/style.css')设置
    外部样式表之前，必须先设置app的静态文件夹，因为pug约定在静态文件夹里面寻找href的路径
    */
    app.use(express.static('./public'));
    return app;
};