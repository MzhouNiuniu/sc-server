require('babel-core/register');
const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var  config = require( './config/settings')

const xmlParser = require('koa-xml-body')
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('koa2-cors');
const questionBank = require('./routes/questionBank')
const knowledge = require('./routes/knowledge')
const headline = require('./routes/headline')
const administrator = require('./routes/administrator')
const certificate = require('./routes/certificate')
const course = require('./routes/course')
const oss =require('./routes/oss')
const test =require('./routes/test')

//客户端
const index =require('./routes/index')
const knowledgec =require('./routes/client/knowledge')

const questionBankc =require('./routes/client/questionBank')
const user =require('./routes/client/user')
const coursec =require('./routes/client/course')
const testc =require('./routes/client/test')
const sslify = require('koa-sslify').default;
app.use(sslify());
onerror(app)
app.use(xmlParser())
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 500*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(bodyparser(
))
app.use(function(ctx, next) {
    //只有xml用中中间件
    if(ctx.request.header['content-type']=='text/xml'){
        ctx.body = ctx.request.body
    }
    return next()
})
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public/dist'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// router.all('/editor/controller', ueditor('public'))

app.use(course.routes(), course.allowedMethods())
app.use(oss.routes(), oss.allowedMethods())
app.use(questionBank.routes(), questionBank.allowedMethods())
app.use(knowledge.routes(), knowledge.allowedMethods())
app.use(headline.routes(), headline.allowedMethods())
app.use(administrator.routes(), administrator.allowedMethods())
app.use(certificate.routes(), certificate.allowedMethods())
app.use(test.routes(), test.allowedMethods())


//客户端接口
app.use(index.routes(), index.allowedMethods())
app.use(knowledgec.routes(), knowledgec.allowedMethods())
app.use(questionBankc.routes(), questionBankc.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(coursec.routes(), coursec.allowedMethods())
app.use(testc.routes(), testc.allowedMethods())


// app.use(order.routes(), order.allowedMethods())
// app.use(wxconfig.routes(), wxconfig.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
