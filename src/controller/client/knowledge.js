const Model = require("../../model/client/knowledge");
const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//
class knowledge {
    constructor() {
        // super()
    }
    async getList(ctx){
        try {
            console.log('222')
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
    async getDetailsById(ctx){
        try {
            const req = ctx.request.query
            const res = await Model.getDetailsById(req.id)

            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
}

module.exports = new knowledge();
