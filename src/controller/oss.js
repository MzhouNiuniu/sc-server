import config from "../../config/settings";
const {server, siteFunc} = require('../../utils');
const formidable = require('formidable');
var path = require('path');
var fetch = require("node-fetch");
const fs = require('fs');
var shortid = require('shortid');
import  {baseUrl} from '../../config/settings'
function download(u, p) {
    return fetch(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => {
        console.log(res)
    console.log(res.buffer())

    }).then(_ => {
        fs.writeFile(p, _, "binary", function (err) {
            console.log(err || p);
        });
    });
}
// var fdfs = new FdfsClient({
//     // tracker servers
//     trackers: [
//         {
//             host: '47.110.10.44',
//             port: 22122
//         }
//     ],
//     // 默认超时时间10s
//     timeout: 10000,
//     // 默认后缀
//     // 当获取不到文件后缀时使用
//     defaultExt: 'txt',
//     // charset默认utf8
//     charset: 'utf8'
// });

class Oss {
    constructor() {
        // super()
    }
    /**
     * @apiGroup Oss
     * @upload 上传
     * @api {post} /Oss/upload 上传文件
     * @apiSampleRequest  /Oss/upload
     */
    async upload(ctx, next) {
        try {
            // console.log(ctx.request.files)
            const File= ctx.request.files.file
            var oldpath = File.path;
            let _id = shortid.generate()
            var newpath
            let suffix

            suffix=_id+`.${File.name.split(".").reverse()[0]}`
            // newpath = path.join(path.dirname(oldpath),suffix);
            let  filePath = path.join(__dirname, '../../public/dist/upload/'+ `/${suffix}`);
            const reader = fs.createReadStream(File.path);
            const upStream = fs.createWriteStream(filePath);
            reader.pipe(upStream);
           const data =[baseUrl+suffix]
           ctx.body=siteFunc.renderApiData(ctx,200,'ok',data)

        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
            // res.send(siteFunc.renderApiErr(req, res, 500, err))
        }
    }
    async uploadwang(ctx, next) {
        try {
            // console.log(ctx.request.files)
            const File= ctx.request.files.file
            var oldpath = File.path;
            let _id = shortid.generate()
            var newpath
            let suffix

            suffix=_id+`.${File.name.split(".").reverse()[0]}`
            // newpath = path.join(path.dirname(oldpath),suffix);
            let  filePath = path.join(__dirname, '../../public/dist/upload/'+ `/${suffix}`);
            const reader = fs.createReadStream(File.path);
            const upStream = fs.createWriteStream(filePath);
            reader.pipe(upStream);
            const data ={
                "errno": 0,
                "data":[baseUrl+suffix]
            }
            ctx.body=data

        }
        catch (err) {
            ctx.body=siteFunc.renderApiErr(ctx, 500, err)
            // res.send(siteFunc.renderApiErr(req, res, 500, err))
        }
    }

    /**
     * @apiGroup Oss
     * @download 下载
     * @api {get} /Oss/download 下载文件
     * @apiParam {string} id  文件id
     * @apiSampleRequest  /Oss/download
     */
    async download(req, res, next) {
        try {

            var name =`${req.query.name}`;
            name = encodeURI(name,"GBK")
            name = name.toString('iso8859-1')
            var path = `public/dist/upload/${req.query.url.split("/").reverse()[0]}`;
            var size = fs.statSync(path).size;
            var f = fs.createReadStream(path);

            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-Disposition': 'attachment; filename=' + name,
                'Content-Length': size
            });
            f.pipe(res);

        }
        catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err))
        }
    }
    async upLargeFile(ctx){
        console.log('3212')
        const File= ctx.request.files.file
        // console.log(File)
        // boundary=ctx.headers["content-type"].split("=")[1]
        // boundary = '--'+boundary
        console.log(splitBuffer(File,10))
        function splitBuffer(buffer,sep) {
            let arr = [];
            let pos = 0;//当前位置
            let sepPosIndex = -1;//分隔符的位置
            let sepPoslen = Buffer.from(sep).length;//分隔符的长度，以便确定下一个开始的位置
            do{
                sepPosIndex=buffer.indexOf(sep,pos)
                if(sepPosIndex==-1){
                    //当sepPosIndex是-1的时候，代表已经到末尾了，那么直接直接一口读完最后的buffer
                    arr.push(buffer.slice(pos));
                }else{
                    arr.push(buffer.slice(pos,sepPosIndex));
                }
                pos = sepPosIndex+sepPoslen
            }while(-1!==sepPosIndex)
            return arr
        }

        // let buf = [];
        // let allData;
        // ctx.req.on("data",(data)=>{
        //     buf.push(data)
        // });
        // ctx.req.on("end",(data)=> {
        //     allData = Buffer.concat(buf)
        //
        // })
        }
}

module.exports = new Oss();
