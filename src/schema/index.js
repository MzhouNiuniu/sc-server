const Sequelize = require('sequelize');
const config = require('../../config/settings');
// const course =require('./course');
const sequelize = new Sequelize(config.DB, config.USERNAME, config.PASSWORD,{
    host: config.HOST,
    dialect:'mysql',
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //默认输出执行sql语句
    logging: console.log,
    // 数据表全局配置
    define:{
        //是否冻结表名,最好设置为true，要不sequelize会自动给表名加上复数s造成查询数据失败。
        //mongoose也有这样的问题...
        freezeTableName:true,
        // 是否为表添加 createdAt 和 updatedAt 字段
        // createdAt 记录表的创建时间
        // updatedAt 记录字段更新时间
        timestamps:false,
        // 是否为表添加 deletedAt 字段
        // 在日常开发中删除数据记录是一大禁忌，因此我们删除数据并不会真正删除，而是为他添加
        // deletedAt字段
        paranoid:false,
        //是否开启op
        operatorsAliases: true
    },
    timezone: '+08:00', //改为标准时区
    // 添加这个配置 格式化时间
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    }
});

sequelize.authenticate().then(() => {
   console.log('链接成功')
}).catch(err => {
    console.log('Unable to connect to the database', err)
})
exports.sequelize = sequelize
// exports.course = course
// exports.a = 1
