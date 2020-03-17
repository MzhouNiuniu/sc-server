const router = require('koa-router')()
const controller = require('../../src/controller/client/user')
const model = controller
// console.log()
router.prefix('/client/user')
router.post('/publish', model.publish)
router.get('/wxLogin', model.wxLogin)
router.post('/changeInFo', model.changeInFo)
router.post('/changeTest', model.changeTest)
router.get('/getAttention', model.getAttention)
router.get('/getTest', model.getTest)
router.get('/getMyTest', model.getMyTest)

module.exports = router
