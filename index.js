/**
 * Created by linyuhua on 2017/5/4.
 */
const Koa = require('koa');
const app = new Koa();

app.use( ctx => {
    ctx.body = 'node-login';
})

app.listen(3003);