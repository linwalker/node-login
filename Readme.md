## 前言

这是一个基于node实现的一个简单登入例子，对于刚上手node想进一步了解，前端页面请求到服务层，路由处理，数据库操作，返回结果到页面这整个过程的同学比较有用。这个例子基于github上两个项目（文末有链接），自己整理改写，希望有需要的同学可以看到。

**项目源码地址**：<https://github.com/linwalker/node-login>

	
## 技术栈

- node 使用 Koa框架，node版本7.6以上可以直接使用async/await;
- 使用mongoose来与Mongodb数据库连接交互;
- 前端使用react与antd-design组件;
- webpack 打包构建

## 环境准备与运行

- node.js >= 7.6
- mongodb 安装
- robomongo 安装 （mongodb的可视化工具）
- mongodb 新建名为node-login的数据库，并开启；
- npm install 安装依赖
- npm run build 代码构建
- node app 开启服务，可以访问localhost:3003/home

## 项目目录

	node-login
		|-- components	   			//页面组件
			|-- LoginTab.js
			|-- RegisterTab.js
		|-- controller          //路由回调处理
			|-- user-info.js
		|-- models     			//用户模型
			|-- user.js
		|-- pages					//页面js
			|-- home
				|-- home.js
				|-- index.js
			|-- main
		|-- routes					//路由
		|-- static					//静态文件
		|-- tools					//webpack构建文件
		|-- views					//页面模版
		|-- .babelrc
		|-- app.js					//入口文件
		|-- config.js				//配置文件
		|-- package.json
		
## 具体介绍

### 入口文件 - app.js

```js
const Koa = require('koa');
const...
const app = new Koa();

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 使用ctx.body解析中间件
app.use(bodyParser());

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , './static')
)))

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3003);
console.log('The server is on prot 3003')
```

服务主要进行数据库连接，路由处理，静态文件配置和页面模板渲染。

### 配置文件 - config.js

```js
module.exports = {
    'secrect': 'linwalkernodelogindemo', //暂未用到，用于后期token验证
    'database': 'mongodb://localhost:27017/node-login'//填写本地 mongodb 连接地址
};
```
主要设置连接mongodb数据的连接地址

### 用户模型 - user.js

定义登入注册的用户模型

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);
```
用户模型主要三个数据，用户名，密码和邮箱。

### 路由

路由总入口`/routes/index.js`引入所有路由，使用koa-router中间件

```js
const router = require('koa-router')();
const home = require('./home');
const main = require('./main');
const editor = require('./editor');

router.use('/home', home.routes(), home.allowedMethods());
router.use('/main', main.routes(), main.allowedMethods());
router.use('/editor', editor.routes(), editor.allowedMethods());

module.exports = router;
```
三个主路由为`/home`,`/main/`和`/editor`，主要来看下`/home`：

```js
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

```

`home.js`的`get`请求返回`home`页面，两个post请求，分别是注册和登入处理。我们来看下登入请求处理`user-info.js`。

```js
const User = require('./../models/user');

module.exports = {
    async signUp (ctx) {
    	...
    },

    async signIn (ctx) {
        let result = {
            success: false,
            message: '用户不存在'
        };
        //从请求体中获得参数
        const { username,  password } = ctx.request.body;
        //检查数据库中是否存在该用户名
        await User.findOne({
            username
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                ctx.body = result;
            } else {
                //判断密码是否正确
                if (password === user.password) {
                    ctx.body = {success: true, message: '登入成功'}
                } else {
                    ctx.body = {success: false, message: '密码错误'}
                }
            }
        })
    }
}
```

登入请求处理过程为先检查用户名是否存在，在判断密码是否正确。

### 操作演示
演示用户名不存在，密码错误及成功登入。

![登入.gif](http://upload-images.jianshu.io/upload_images/4361182-dd5d9ba27c466687.gif?imageMogr2/auto-orient/strip)

### 总结

- 使用了koa框架，主要是路由和ctx上下文的处理，没用过的同学可以点击[koa2教程](https://chenshenhai.github.io/koa2-note/note/start/quick.html)去看看，这是koa的一个入门教程写的很不错；
- 使用了mongoose操作数据库，栗子中涉及的不难，只是一个User模型，一个save保存数据和一个findOne查找，看下[文档](http://www.nodeclass.com/api/mongoose.html#guide)就明白，或则看下[这篇文章](https://github.com/ChenShenhai/koa2-note/blob/master/demo/project/)
- 使用[antd-design](https://ant.design/components/menu-cn/) 组件 

### 备注

这个例子主要参考了：
[项目1](https://github.com/Nicksapp/nAuth-restful-api)
[项目2](https://github.com/ChenShenhai/koa2-note/blob/master/demo/project/)