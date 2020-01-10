const router = require('koa-router')()
const controller = require('../../src/controller/client/user')
const model = controller
// console.log()
router.prefix('/client/user')
router.post('/publish', model.publish)
router.get('/wxLogin', model.wxLogin)
router.post('/changeInFo', model.changeInFo)

module.exports = router
