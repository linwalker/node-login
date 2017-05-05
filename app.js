/**
 * Created by linyuhua on 2017/5/4.
 */
const Koa = require('koa');
const views = require('koa-views')
const path = require('path')

const app = new Koa();

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));


app.use( async (ctx) => {
    const title = 'node-login';
    await ctx.render('index',{
        title
    })
    console.log('The server start at prot 3003')
})
app.listen(3003);