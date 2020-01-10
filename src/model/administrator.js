const db = require('../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../schema/administrator');
const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
Schema.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)
const size = 10 // 每页10条数据
const page = 1 // 页数
class administrator {
     async create(data) {
        return await Schema.create(data);
    }
    async getList(data){
        return await Schema.findAndCountAll({
            where: {
                userName: {
                    [Op.like]: `%${data.keyWords}%`,
                },
            },
            limit: data.limit,
            offset: data.limit * (data.page - 1),
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
    async checkInfo(data){
         console.log(data)
        return await Schema.findOne({where:data});
    }
}

module.exports = new administrator();
