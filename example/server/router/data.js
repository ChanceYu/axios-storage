const Router = require('koa-router')

let router = new Router()

router.get('/:id', async (ctx) => {
    ctx.body = {
        id: 1,
        name: 'axios-storage',
        params: ctx.params,
        query: ctx.query
    }
})

module.exports = router;