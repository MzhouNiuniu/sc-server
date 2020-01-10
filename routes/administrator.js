const router = require('koa-router')()
const controller = require('../src/controller/administrator')
const model = controller
// console.log()
router.prefix('/administrator')
router.post('/publish', model.publish)
router.get('/getList', model.getList)
router.get('/deleteById', model.deleteById)
router.get('/getDetailsById', model.getDetailsById)
router.post('/changeInFo', model.changeInFo)
router.post('/checkInfo', model.checkInfo)


module.exports = router
