const db = require('../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const Schema = Sequelize.import('../schema/user');
const CSchema = Sequelize.import('../schema/course');
const TSchema = Sequelize.import('../schema/test');
const TLSchema = Sequelize.import('../schema/testlog');

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
Schema.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)
const size = 10 // 每页10条数据
const page = 1 // 页数
class user {
    async create(data) {
        return await Schema.create(data);
    }
    async getDetailsById(id){
        return await Schema.findOne({where:{
            openid:id
            }});
    }
    async changeInFo(data){
        return await Schema.update(data,{
            where: {
                openid: data.openid
            }
        });
    }
    async getAttention(id){
        let res=[]
        const U=await Schema.findOne({
            where:{
                openid:id
            }
        })
        console.log(U.followed)
        if(U.followed){
            let arr=Array.prototype.slice.call(JSON.parse(U.followed))
            for( let i=0; i<arr.length; i++){
                let re=  await CSchema.findOne({
                    where:{
                        id:arr[i]
                    }
                })
                console.log()
                    re.cover=JSON.parse(re.cover)
                res.push(re)
            }
        }
        else{
            res=[]
        }
        return res

    }
    async getTest(id){
        let res=[]
        const U=await Schema.findOne({
            where:{
                openid:id
            }
        })
        if(U.haveLessons){
            let arr=Array.prototype.slice.call(JSON.parse(U.haveLessons))
            for( let i=0; i<arr.length; i++){
                let re=  await TSchema.findOne({
                    where:{
                        id:arr[i]
                    }
                })
                // re.cover=JSON.parse(re.cover)
                res.push(re)
            }
        }
        else{
            res=[]
        }
        return res
    }
    async getMyTest(id,date){
        const res=await TLSchema.count({
            where:{
                openid:id,
                date
            }
        })
        return res
    }
}

module.exports = new user();
