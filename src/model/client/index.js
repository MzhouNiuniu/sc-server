const db = require('../../schema/index'); // 引入配置文件
let Sequelize = db.sequelize;
const CSchema = Sequelize.import('../../schema/course');
const CerSchema = Sequelize.import('../../schema/certificate');
const HSchema = Sequelize.import('../../schema/headline');
const KSchema = Sequelize.import('../../schema/knowledge');
const QSchema = Sequelize.import('../../schema/questionBank');
const USchema = Sequelize.import('../../schema/user');
const TLSchema = Sequelize.import('../../schema/testlog');

var moment = require('moment')

const Sequelizes = require('sequelize');
const Op = Sequelizes.Op;
const size = 10 // 每页10条数据
const page = 1 // 页数
function getRandomArrayElements(arr, count) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<count; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;

}
const arr =[{
    name:'原创',
    value:0
},{
    name:'转载',
    value:1,
}]


function getWeekDay(dateString) {
    let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;
        let presentDate = new Date(),
            today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
        return Array.from(new Array(7), function(val, index) {
            return formatDate(new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000));
        });
    function formatDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}

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

        res.rows.forEach(item=>{
                let dataType= arr[item.dataType].name
                item.dataType=dataType
            let cover= JSON.parse(item.cover)
            item.cover=cover[0]?cover[0].url:''
        })
        return  res
    }
    async getDetailsById(id){
        return await CerSchema.findByPk(id);
    }
    async getStudyIndex(id){
        getWeekDay()
        let data=getWeekDay()
        console.log(data)
        const rank= await Sequelize.query(`select openid,count(openid) from testlog where date>="${data[0]}" and date<="${data[data.length-1]}" group by openid`)
        rank.sort(function(a,b){
            return b['COUNT(openid)'] -a['COUNT(openid)']
        })
        let ranking=0
        rank[0].map((item,index)=>{
            if(item.openid==id){
                ranking=index+1
            }
        })
        const KC= await KSchema.count({
           where: {
               status:1,
           },
       })
        const AllC=await QSchema.findAll({
            where: {
                status:1,
            },
            attributes: [[Sequelize.fn('SUM', Sequelize.col('didNumber')), 'count']]
        })
        const  AllQ= await QSchema.count({
            where: {
                status: 1,
            }
        })

        const dd= moment(new Date()).format('YYYY-MM-DD')
        const UC= await USchema.findAll({
            where: {
                openid:id
            }
        })
        let obj

        if(UC&UC[0]&&UC[0].dayTest){

            if(JSON.parse(UC[0].dayTest).date==dd){
                let arr=JSON.parse(UC[0].dayTest).getRQ
                let arrs=[]
                for( let i=0; i<arr.length; i++){
                    let re=  await QSchema.findOne({
                        where:{
                            id:arr[i].id
                        }
                    })
                    arrs.push(re)
                }
                  obj={
                    date:dd,
                      getRQ:arrs
                }


            }
            else{
                const  getQ=await QSchema.findAll({
                    where: {
                        status:1,
                    }
                })

                let getRQ=getRandomArrayElements(getQ, 4)
                obj={
                    date:dd,
                    getRQ
                }
                await USchema.update({dayTest:JSON.stringify(obj)},{
                    where: {
                        openid:id
                    }
                })
            }
        }
        else{
            const  getQ=await QSchema.findAll({
                where: {
                    status:1,
                }
            })
            console.log(getQ)
            if(getQ.length>0){
                let getRQ=getRandomArrayElements(getQ, 4)
                obj={
                    date:dd,
                    getRQ
                }

                const da=JSON.stringify(obj)
                await USchema.update({dayTest:da},{
                    where: {
                        openid:id
                    }
                })
            }
            else{
                //题库没有题的时候
                obj={
                    date:dd,
                    getRQ:getQ
                }
            }

        }
        const res={
            knowledgeCount:KC,
            studied:AllC[0].count?AllC[0].count:{count:0},
            test:obj,
            AllQ,
            ranking
        }
        return res
    }

    async getHSDetailsById(id){
        await HSchema.update(
            {readNumber:Sequelize.literal('readNumber+1')},
            {
                where: {
                    id: id,
                }
            })
        let res = await HSchema.findByPk(id);
        res.dataType=arr[res.dataType].name

        return res
    }
}

module.exports = new indexModel();
