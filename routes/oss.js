// var express = require('express');
// var router = express.Router();
// const { Oss } = require('../src/controller');
// var multer  = require('multer')
// // var upload = multer({ dest: 'uploads/' })
// import authToken from '../utils/authToken'
//
const router = require('koa-router')()
const controller = require('../src/controller/oss')
const model = controller
router.prefix('/oss')
router.post('/upload', model.upload)
router.post('/uploadwang', model.uploadwang)
router.get('/download',model.download)
router.post('/upLargeFile', model.upLargeFile)


module.exports = router
