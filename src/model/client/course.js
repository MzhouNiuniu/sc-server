const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../../schema/course');
const SchemaU = Sequelize.import('../../schema/user');
const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
class courseModel {
    async getList(data){
      const course = await Schema.findAndCountAll({
            where: {
                status:1,
                name: {
                    [Op.like]: `%${data.keyWords}%`,
                },
            },
            limit: data.limit,
            offset: data.limit * (data.page - 1),
            order: [
                ['stickTime','DESC'],
                ['releaseTime']
            ]
        });
        course.rows.forEach(item=>{
            item.label=JSON.parse(item.label)
            item.cover=JSON.parse(item.cover)[0].url
        })
        return course
    }
    async getDetailsById(id){
        await Schema.update(
            {readNumber:Sequelize.literal('readNumber+1')},
            {
                where: {
                    id: id,
                }
            })
        return await Schema.findByPk(id);
    }
    async changeAttention(data){
        // SchemaU
        console.log(data)
        return await SchemaU.update(data,{
            where: {
                openid: data.openid
            }
        });
    }
    async changeApplied(data){
        // SchemaU
        return await SchemaU.update(data,{
            where: {
                id: data.id
            }
        });
    }

}

module.exports = new courseModel();
