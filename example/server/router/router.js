const Router = require('koa-router')

const home = require('./home')
const data = require('./data')

// 装载所有子路由
let router = new Router()

router.use('/', home.routes(), home.allowedMethods())
router.use('/data', data.routes(), data.allowedMethods())

module.exports = router;