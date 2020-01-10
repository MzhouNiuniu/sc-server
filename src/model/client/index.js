const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const CSchema = Sequelize.import('../../schema/course');
const CerSchema = Sequelize.import('../../schema/certificate');
const HSchema = Sequelize.import('../../schema/headline');

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
class indexModel {
    async getIndex() {
        const course= await CSchema.findAll({
            where: {
                status:1,
            }
        },{
            limit:3
        })
        course.forEach(item=>{
            item.label=JSON.parse(item.label)
            item.cover=JSON.parse(item.cover)[0].url
        })
        const certificate= await CerSchema.findAll({
            where: {
                status:1,
            }
        })
        certificate.forEach(item=>{
            item.label=JSON.parse(item.label)
            item.cover=JSON.parse(item.cover)[0].url
        })
      let res={
          course,
          certificate
      }
        return res
    }
    async getList(data){
        let res = await HSchema.findAndCountAll(
            {
                where: {
                    status:1,
                },
                limit: data.limit,
                offset: data.limit * (data.page - 1),
                order: [
                    ['releaseTime']
                ]
            }
        );
        const arr =[{
            name:'原创',
            value:0
        },{
            name:'转载',
            value:1,
        }]
        res.rows.forEach(item=>{
                let dataType= arr[item.dataType].name
                item.dataType=dataType
            let cover= JSON.parse(item.cover)
            item.cover=cover[0].url
        })
        return  res
    }

}

module.exports = new indexModel();
