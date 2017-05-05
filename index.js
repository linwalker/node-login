/**
 * Created by linyuhua on 2017/5/4.
 */
const Koa = require('koa');
const app = new Koa();



app.use( async( ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time',`${ms}ms`);
})

app.use( async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
})

app.use( ctx => {
    ctx.body = 'node-login';
    console.log('The server start at prot 3003')
})
app.listen(3003);