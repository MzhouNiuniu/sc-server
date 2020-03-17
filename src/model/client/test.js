const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../../schema/test');
const USchema = Sequelize.import('../../schema/user');

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
class test {
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
        let res = await Schema.findByPk(id);


        return res
    }

}

module.exports = new test();
