const router = require('koa-router')()
const controller = require('../../src/controller/client/knowledge')
const model = controller
// console.log()
router.prefix('/client/knowledge')
router.get('/getList', model.getList)
router.get('/getDetailsById', model.getDetailsById)
module.exports = router
