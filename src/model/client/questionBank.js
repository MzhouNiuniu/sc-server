const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../../schema/questionBank');
const TSchema = Sequelize.import('../../schema/testlog');
const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
class questionBank {
    async getList(data){
        console.log(data.keyWords)
        return await Schema.findAndCountAll({
            where: {
                topic: {
                    [Op.like]: `%${data.keyWords}%`,
                },
                status:1
            },
            limit: data.limit,
            offset: data.limit * (data.page - 1),
            order: [
                ['releaseTime']
            ]
        });
    }
    async getDetailsById(id){
       const res= await Schema.findByPk(id);
        res.option=JSON.parse(res.option)
        res.rightAnswer=JSON.parse(res.rightAnswer)

        return res
    }
    async addCount(id){
        const res = await Schema.update(
            {didNumber:Sequelize.literal('didNumber+1')},
            {
            where: {
                id: id,
            }
        })
        return res
    }
    async addRight(id){
        console.log('right')
        const res = await Schema.update(
            {rightCount:Sequelize.literal('rightCount+1')},
            {
                where: {
                    id: id,
                }
            })
        return res
        // errorCount rightCount
    }
    async addErr(id){
        console.log('err')
        const res = await Schema.update(
            {errorCount:Sequelize.literal('errorCount+1')},
            {
                where: {
                    id: id,
                }
            })
        return res
    }
    async addTestLog(data){
        const res =await TSchema.create(data);
        return  res
    }

}

module.exports = new questionBank();
