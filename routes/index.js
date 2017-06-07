/**
 * Created by linyuhua on 2017/5/17.
 */
const router = require('koa-router')();

const home = require('./home');
const main = require('./main');
const editor = require('./editor');
const github = require('./github');

router.use('/home', home.routes(), home.allowedMethods());
router.use('/main', main.routes(), main.allowedMethods());
router.use('/editor', editor.routes(), editor.allowedMethods());
router.use('/github', github.routes(), github.allowedMethods());

module.exports = router;