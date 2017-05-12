/**
 * Created by linyuhua on 2017/5/4.
 */
const Koa = require('koa');
const views = require('koa-views')
const path = require('path')
const Router =require('koa-router');
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');

const app = new Koa();

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));
// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , './static')
)))
let index = new Router();
index.get('/', async (ctx) => {
    const title = 'login index';
    await ctx.render('index', {
        title
    })
})

let main = new Router();
main.get('/', async (ctx) => {
    const title = 'main';
    await ctx.render('main', {
        title
    })
})

let router = new Router();
router.use('/index',index.routes(),index.allowedMethods());
router.use('/main',main.routes(),main.allowedMethods());
app.use(router.routes())


app.listen(3003);
console.log('The server is on prot 3003')