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
            if(!user) {
                var newUser = new User({
                    username: username,
                    password: password,
                    email: email,
                });

                const doc = await newUser.save();
                if ( !doc.errors) {
                    ctx.body = {success: true, message: '注册成功'}
                } else {
                    ctx.body = result;
                }
            } else {
                ctx.body = { success: false, message: 'username already registered'};
            }
        }
    }
}