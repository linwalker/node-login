/**
 * Created by linyuhua on 2017/5/4.
 */
const Koa = require('koa');
const views = require('koa-views')
const path = require('path')
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const config = require('./config');
const routers = require('./routes/index');
const app = new Koa();

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 使用ctx.body解析中间件
app.use(bodyParser());

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , './static')
)))

mongoose.Promise = global.Promise;
// mongoose.connect(config.database);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3003);
console.log('The server is on prot 3003')