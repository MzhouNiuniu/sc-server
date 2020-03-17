const Model = require("../model/index").knowledge;
const {server, siteFunc} = require('../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//课程
class Knowledge {
    constructor() {
        // super()
    }
    async publish(ctx, next) {
        try {
            const req =ctx.request.body
            const params={
                title:req.title,
                content:req.content,
                dataType:req.dataType,
                releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
              await Model.create(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, '插入成功')
        }
        catch (err) {
           ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
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
    async deleteById(ctx){
        try {
            const req = ctx.request.query
            const res = await Model.deleteById(req.id)
            if(res>0){
                ctx.body=siteFunc.renderApiData(ctx, 200, 'ok')

            }
            else{
                ctx.body=siteFunc.renderApiData(ctx, 500, '删除失败')
            }
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



    async changeInFo(ctx){
        try {
            const req =ctx.request.body
            const params={
                title:req.title,
                content:req.content,
                dataType:req.dataType,
                id:req.id,
                releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                status:0
            }
            await Model.changeInFo(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, '修改成功')
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
    async changeStatus(ctx){
        try {
            const req =ctx.request.query
            const params={
                status:req.status,
                id:req.id
            }
            if(req.status==2){
                const resAuditList = await Model.getDetailsById(req.id)
                let auditList
                if(resAuditList.auditList){
                   auditList=JSON.parse(resAuditList.auditList)
                }
                else{
                    auditList=[]
                }
                auditList.push({author:'1',message:req.reason,releaseTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')})
                params.auditList=JSON.stringify(auditList)
            }
          const res =  await Model.changeInFo(params)
            console.log(res)
            ctx.body=siteFunc.renderApiData(ctx, 200, '审核成功')
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
    async changeStick(ctx){
        const req =ctx.request.query
        const params={
            stick:req.stick,
            id:req.id,
            stickTime:req.stick==1?moment(new Date()).format('YYYY-MM-DD HH:mm:ss'):null
        }
        const res =  await Model.changeInFo(params)
        ctx.body=siteFunc.renderApiData(ctx, 200, '操作成功')
    }

}

module.exports = new Knowledge();
