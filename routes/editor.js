/**
 * Created by linyuhua on 2017/5/17.
 */

const router = require('koa-router')();

const routers = router
    .get('/', async (ctx) => {
        ctx.body = '还未开发'
    })

module.exports = routers;