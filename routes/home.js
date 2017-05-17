/**
 * Created by linyuhua on 2017/5/17.
 */

const router = require('koa-router')();
const userInfoController = require('./../controller/user-info');

const routers = router
    .get('/', async (ctx) => {
        const title = 'login home';
        await ctx.render('home', {
            title
        })
    })
    .post('/signup', userInfoController.signUp)
    .post('/signin', userInfoController.signIn)

module.exports = routers;