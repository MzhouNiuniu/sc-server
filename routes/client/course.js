const router = require('koa-router')()
const controller = require('../../src/controller/client/course')
const model = controller
// console.log()
router.prefix('/client/course')
router.get('/getList', model.getList)
router.get('/getDetailsById', model.getDetailsById)
router.post('/attention', model.attention)
router.post('/applied', model.applied)


module.exports = router
