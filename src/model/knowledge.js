const db = require('../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../schema/knowledge');

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
Schema.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)
const size = 10 // 每页10条数据
const page = 1 // 页数
class knowledge {
     async create(data) {
        return await Schema.create(data);
    }
    async getList(data){
        return await Schema.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${data.keyWords}%`,
                },
            },
            limit: data.limit,
            offset: data.limit * (data.page - 1),
            order: [
                ['stickTime','DESC'],
                ['releaseTime','DESC']
            ]
        });
    }
    async deleteById(id) {
        return await Schema.destroy({where:{id}});
    }
    async getDetailsById(id){
        return await Schema.findByPk(id);
    }
    async changeInFo(data){
        return await Schema.update(data,{
            where: {
                id: data.id
            }
        });
    }
}

module.exports = new knowledge();
