/**
 * Created by linyuhua on 2017/5/17.
 */
const User = require('./../models/user');

module.exports = {
    async signUp (ctx) {

        let result = {
            success: false,
            message: '注册失败'
        };
        const { username, email, password } = ctx.request.body;

        if (!username && !password) {
            result.message = '请填写用户名和密码';
            ctx.body = result;
        } else {
            let user = await User.findOne({username});
            //检查用户名是否已存在
            if(!user) {
                const newUser = new User({
                    username: username,
                    password: password,
                    email: email,
                });

                const doc = await newUser.save();
                if (!doc.errors) {
                    ctx.body = {success: true, message: '注册成功'}
                } else {
                    ctx.body = result;
                }
                // 下面会代码执行时，会直接先跳过save的回掉处理，路由返回404，再执行err回掉，原因暂不清楚
                // await newUser.save(err => {
                //     if (err) {
                //         ctx.body = result;
                //     } else {
                //         ctx.body = {success: true, message: '注册成功'}
                //     }
                // })
            } else {
                ctx.body = { success: false, message: '用户名已存在'};
            }
        }
    },

    async signIn (ctx) {
        let result = {
            success: false,
            message: '用户不存在'
        };
        const { username,  password } = ctx.request.body;
        await User.findOne({
            username
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                ctx.body = result;
            } else {
                if (password === user.password) {
                    ctx.body = {success: true, message: '登入成功'}
                } else {
                    ctx.body = {success: false, message: '密码错误'}
                }
            }
        })
    }
}