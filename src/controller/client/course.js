const Model = require("../../model/client/course");
const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//
class course {
    constructor() {
        // super()
    }
    async getList(ctx){
        try {
            const req= ctx.request.query
            console.log(req)
            const params={
                keyWords:req.keyWords,
                page:Number(req.page),
                limit:Number(req.limit)
            }
            console.log(params)
            const res =await Model.getList(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
    async getDetailsById(ctx){
        try {
            const req = ctx.request.query
            const res = await Model.getDetailsById(req.id)
            res.advantage=JSON.parse(res.advantage)
            res.banner=JSON.parse(res.banner)
            res.cover=JSON.parse(res.cover)
            res.label=JSON.parse(res.label)
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
}

module.exports = new course();
