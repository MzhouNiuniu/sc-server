const Model = require("../model/index").administrator;
const formidable = require('formidable');
const {server, siteFunc} = require('../../utils');
var moment = require('moment')
import config from '../../config/settings'
//课程
class administrator {
    constructor() {
        // super()
    }
    async publish(ctx, next) {
        try {
            const req =ctx.request.body
            const  newPsd= server.encrypt(req.password,  config.encrypt_key);
            const params={
                 userName:req.userName,
                password:newPsd,
                role:req.role,
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
            const params={
                keyWords:req.keyWords,
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
    async deleteById(ctx){
        try {
            const req = ctx.request.query
            const res = await Model.deleteById(req.id)
            console.log(res)
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
            res.password=server.decrypt(res.password,config.encrypt_key);
            res.role=Number( res.role)
            ctx.body=siteFunc.renderApiData(ctx, 200, 'ok',res)
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }



    async changeInFo(ctx){
        try {
            const req =ctx.request.body
            const  newPsd= server.encrypt(req.password,  config.encrypt_key);
            const params={
                userName:req.userName,
                password:newPsd,
                role:req.role,
                releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                id:req.id,
            }
            await Model.changeInFo(params)
            ctx.body=siteFunc.renderApiData(ctx, 200, '修改成功')
        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
        }
    }
   async checkInfo(ctx){
       try {
       const req = ctx.request.body
       const params={
           userName:req.userName,
           password:server.encrypt(req.password,  config.encrypt_key)
       }
       const res = await Model.checkInfo(params)
           if(res){
               ctx.body=siteFunc.renderApiData(ctx, 200, '登陆成功',res)
           }
           else{
               ctx.body=siteFunc.renderApiData(ctx, 500, '密码错误')

           }
       }
       catch (err) {
           ctx.body=siteFunc.renderApiErr(ctx, 500, err)
       }
   }

}

module.exports = new administrator();
