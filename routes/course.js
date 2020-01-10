const router = require('koa-router')()
const controller = require('../src/controller/course')
const model = controller
// console.log()
router.prefix('/course')
router.post('/publish', model.publish)
router.get('/getList', model.getList)
router.get('/deleteById', model.deleteById)
router.get('/getDetailsById', model.getDetailsById)
router.post('/changeInFo', model.changeInFo)
router.get('/changeStatus', model.changeStatus)
router.get('/changeStick', model.changeStick)

module.exports = router
