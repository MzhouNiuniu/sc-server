const router = require('koa-router')()
const controller = require('../../src/controller/client/test')
const model = controller
// console.log()
router.prefix('/client/test')
router.get('/getList', model.getList)
router.get('/getDetailsById', model.getDetailsById)


module.exports = router
