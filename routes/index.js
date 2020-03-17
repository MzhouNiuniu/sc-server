const axios = require('axios')
const router = require('koa-router')()
const koa2Req = require('koa2-request')
const {server, siteFunc, db,logUtil} = require('../utils');
const controller = require('../src/controller/client/index')
const model = controller
router.prefix('/client')
router.get('/index', model.getIndex)
router.get('/getList', model.getList)
router.get('/getCertificateById', model.getCertificateById)
router.get('/getStudyIndex', model.getStudyIndex)
router.get('/getHSDetailsById', model.getHSDetailsById)
router.get('/getOpenId',async (ctx, next) => {
    console.log('321')
    // 接收appid,appsecret,code
    const {APPID,SECRET,JSCODE} = {
        APPID:'wx625901cd46864997',
        SECRET:'a3f19fb185f93c10c72fe73979e7e57e',
        JSCODE:JSON.parse(ctx.request.query.data).code
    }
    // 组合url
    let url =`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
    // 向微信服务器发送请求
    console.log(url)
    let res = await koa2Req(url);
    // console.log(res)
    // 获取session_key和openid
    // console.log(res)
    const {session_key,openid} = JSON.parse(res.body);
    // 生成_3rd_session
    // const _3rd_session = `${Date.now()}+${Math.random()}`
    // 存入Redis并设置过期时间
    // const result = await redisClient.set(_3rd_session,JSON.stringify({session_key:session_key,openid:openid}))
    // await redisClient.expire(_3rd_session,REDIS_EXPIRES)
    // 返回_3rd_session
    // if(result){
    // ctx.body=JSON.parse(res.body)
    const ress={
        "session_key": session_key,
        "openid": openid
    }
    ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',ress)
    })




    module.exports = router
