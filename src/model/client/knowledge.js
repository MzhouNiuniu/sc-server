const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../../schema/knowledge');
const SchemaQ = Sequelize.import('../../schema/questionBank');

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
class knowledgeModel {
    async getList(data) {
        return await Schema.findAndCountAll({
            where: {
                status: 1
            },
            limit: data.limit,
            offset: data.limit * (data.page - 1),
            order: [
                ['stickTime', 'DESC'],
                ['releaseTime']
            ]
        });
    }

    async getDetailsById(id) {
        let k = await Schema.findByPk(id);
        let q = await  SchemaQ.findAll({
                where: {
                    knowledgeId: id,
                }
            }
        )
        let res={
            k,q
        }
        console.log(res)
        return res
    }
}

module.exports = new knowledgeModel();
