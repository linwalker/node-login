
const config = require('../config');
const router = require('koa-router')();
const fetch = require('node-fetch');
// const fetch = require('isomorphic-fetch');
const request = require('request');
const https = require('https');
const routers = router
    .get('/login', async (ctx) => {
        var dataStr = (new Date()).valueOf();
        //重定向到认证接口,并配置参数
        //注意这里使用的是node的https模块发起的请求
        var path = "https://github.com/login/oauth/authorize";
        path += '?client_id=' + config.client_id;
        path += '&scope=' + config.scope;
        path += '&state=' + dataStr;
        //转发到授权服务器
        // console.log(path);
        ctx.redirect(path);
    })
    .get('/oauth/callback', async (ctx) => {
        const code = ctx.query.code;
        let path = 'https://github.com/login/oauth/access_token';
        // path += '?client_id=' + config.client_id;
        // path += '&client_secret=' + config.client_secret;
        // path += '&code=' + code;
        console.log(path);
        const params = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code
        }
        console.log(code);
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(res => {
            return res.text();
        })
        .then(body => {
            const args = body.split('&');
            let arg = args[0].split('=');
            const access_token = arg[1];
            console.log(body);
            console.log(access_token);
            return access_token;
        })
        .then(async(token) => {
            const url = ' https://api.github.com/user?access_token=' + token;
            console.log(url);
            await fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log(res);
                    ctx.body = 'success';
                })
        })
        .catch(e => {
            console.log(e);
        })
    })

module.exports = routers;