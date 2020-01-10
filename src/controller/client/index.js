const Model = require("../../model/client/index");
const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//首页
class index {
    constructor() {
        // super()
    }
    async getIndex(ctx, next) {
        try {
           const res= await Model.getIndex()
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
    async getList(ctx){
        try {
            const req= ctx.request.query
            const params={
                page:Number(req.page),
                limit:Number(req.limit)
            }
            const res =await Model.getList(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
}

module.exports = new index();
