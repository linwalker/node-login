
const router = require('koa-router')();

const routers = router
    .get('/login', async (ctx) => {
        var dataStr = (new Date()).valueOf();
        var scope = ['user:email']
        //重定向到认证接口,并配置参数
        //注意这里使用的是node的https模块发起的请求
        var path = "https://github.com/login/oauth/authorize";
        path += '?client_id=' + '4179c1e52309f6f55a65';
        path += '&scope=' + scope;
        // path += '&state=' + dataStr;
        //转发到授权服务器
        // console.log(path);
        ctx.redirect(path);
        const title = 'login home';
        await ctx.render('home', {
            title
        })
    })

module.exports = routers;