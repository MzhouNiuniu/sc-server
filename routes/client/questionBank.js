const router = require('koa-router')()
const controller = require('../../src/controller/client/questionBank')
const model = controller
// console.log()
router.prefix('/client/questionBank')
router.get('/getList', model.getList)
router.get('/getDetailsById', model.getDetailsById)
router.get('/addCount', model.addCount)

module.exports = router
