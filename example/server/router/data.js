const Router = require('koa-router')

let router = new Router()

router.get('/', async (ctx) => {
    ctx.body = {
        id: 1,
        name: 'axios-storage',
        query: ctx.query
    }
})

module.exports = router;