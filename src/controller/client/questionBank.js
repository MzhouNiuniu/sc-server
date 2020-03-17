const Model = require("../../model/client/questionBank");
const UModel = require("../../model/user");

const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//
class questionBank {
    constructor() {
        // super()
    }
    async getList(ctx){
        try {
            const req= ctx.request.query
            const params={
                page:Number(req.page),
                limit:Number(req.limit),
                keyWords:req.keyWords
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
    async addCount(ctx){
        try {
            const req = ctx.request.query
            const params={
                date:moment(new Date()).format('YYYY-MM-DD'),
                answer:req.answer,
                openid:req.openid,
                questionBankId:req.id,
            }
             await Model.addTestLog(params)
            const res = await Model.addCount(req.id)
            if(req.answer==1){
                await Model.addRight(req.id)
            }
            else{
                await Model.addErr(req.id)
            }
            const Ures= await UModel.getDetailsById(req.openid)

            let haveTest
            if(Ures.haveTest){
                let arr=Array.prototype.slice.call(JSON.parse(Ures.haveTest))
                arr.push({
                    data: moment(new Date()).format('YYYY-MM-DD'),
                    id:req.id,
                    answer:req.answer
                })
                haveTest=arr
            }
            else{
                haveTest=[{
                    data: moment(new Date()).format('YYYY-MM-DD'),
                    id:req.id,
                    answer:req.answer
                }]

            }
            await UModel.changeInFo({openid:req.openid,haveTest:JSON.stringify(haveTest)})
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }

}


module.exports = new questionBank();
