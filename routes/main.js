/**
 * Created by linyuhua on 2017/5/17.
 */

const router = require('koa-router')();

const routers = router
    .get('/', async (ctx) => {
        const title = 'main';
        await ctx.render('main', {
            title
        })
    })

module.exports = routers;