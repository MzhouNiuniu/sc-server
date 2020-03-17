const Model = require("../../model/user");
const {server, siteFunc} = require('../../../utils');
var moment = require('moment')
// import config from '../../config/settings'
//
//
function doHandleMonth(month) {

    var m = month;

    if (month.toString().length == 1) {

        m = "0" + month;

    }

    return m;

}

function getDay(day) {

    var today = new Date();


    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;


    today.setTime(targetday_milliseconds); //注意，这行是关键代码


    var tYear = today.getFullYear();

    var tMonth = today.getMonth();

    var tDate = today.getDate();

    tMonth = doHandleMonth(tMonth + 1);

    tDate = doHandleMonth(tDate);

    return tYear + "-" + tMonth + "-" + tDate;

}

class user {
    constructor() {
        // super()
    }

    async publish(ctx, next) {
        try {
            const req = ctx.request.body
            console.log(req)
            console.log(ctx.request)
            const params = {
                openid: req.openid,
                nickName: req.nickName,
                nickImg: req.nickImg,
                name: req.name,
                class: req.class,
                phone: req.phone,
                releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(params)
            console.log('3213')
            const res = await Model.create(params)
            ctx.body = siteFunc.renderApiData(ctx, 200, '插入成功')
        }
        catch (err) {
            ctx.body = siteFunc.renderApiErr(ctx, 500, err)
        }
    }

    async wxLogin(ctx, next) {
        const req = ctx.request.query
        const res = await Model.getDetailsById(req.openid)
        ctx.body = siteFunc.renderApiData(ctx, 200, 'ok', res)
    }

    async changeInFo(ctx) {
        try {
            const req = ctx.request.body
            const params = {
                name: req.name,
                openid: req.openid,
                class: req.class,
                phone: req.phone
                // releaseTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            await Model.changeInFo(params)
            ctx.body = siteFunc.renderApiData(ctx, 200, '修改成功')
        }
        catch (err) {
            ctx.body = siteFunc.renderApiErr(ctx, 500, err)
        }
    }

    async changeTest(ctx) {
        try {
            const req = ctx.request.body
            const params = {
                haveLessons: req.haveLessons,
                openid: req.openid
            }
            await Model.changeInFo(params)
            ctx.body = siteFunc.renderApiData(ctx, 200, '修改成功')
        }
        catch (err) {
            ctx.body = siteFunc.renderApiErr(ctx, 500, err)
        }
    }

    async getAttention(ctx) {
        try {
            const req = ctx.request.query
            const res = await Model.getAttention(req.openid)
            ctx.body = siteFunc.renderApiData(ctx, 200, 'ok', res)
        }
        catch (err) {
            ctx.body = siteFunc.renderApiErr(ctx, 500, err)
        }
    }

    async getTest(ctx) {
        try {
            const req = ctx.request.query
            const res = await Model.getTest(req.openid)
            ctx.body = siteFunc.renderApiData(ctx, 200, 'ok', res)
        }
        catch (err) {
            ctx.body = siteFunc.renderApiErr(ctx, 500, err)
        }
    }

    async getMyTest(ctx) {
        const req = ctx.request.query
        let date = []
        let arr = []
        for (var i = 0; i > -7; i--) {
            let time = getDay(i)
            date.push(time)
            const res = await Model.getMyTest(req.openid,time)
            arr.push(res)
        }
        let res={
            date,
            arr
        }
        ctx.body = siteFunc.renderApiData(ctx, 200, 'ok', res)
    }

}

module.exports = new user();
