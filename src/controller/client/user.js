const Model = require("../../model/user");
const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//
class user {
    constructor() {
        // super()
    }
    async publish(ctx, next) {
        try {
            const req =ctx.request.body
            console.log(req)
            console.log(ctx.request)
            const params={
                openid:req.openid,
                nickName:req.nickName,
                nickImg:req.nickImg,
                name:req.name,
                class:req.class,
                phone:req.phone,
                releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(params)
            console.log('3213')
           const res= await Model.create(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, '插入成功')
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
    async wxLogin(ctx, next){
        const req =ctx.request.query
        const res= await Model.getDetailsById(req.openid)
        ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
    }
    async changeInFo(ctx){
        try {
            const req =ctx.request.body
            const params={
                name:req.name,
                openid:req.openid,
                class:req.class,
                phone:req.phone
                // releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            await Model.changeInFo(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, '修改成功')
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
}

module.exports = new user();
