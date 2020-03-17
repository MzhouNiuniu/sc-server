/* jshint indent: 2 */
// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        openid: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique:true,
            // primaryKey: true,
        },
        name:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nickName:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nickImg:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        class:{
            //班级
            type: DataTypes.TEXT,
            allowNull: true,
        },
        haveLessons:{
            //考试报名
            type: DataTypes.TEXT,
            allowNull: true,
        },
        haveTest:{
            //已做测试
            type: DataTypes.TEXT,
            allowNull: true,
        },
        followed:{
            //已关注
            type: DataTypes.TEXT,
            allowNull: true,
        },
        selfTest:{
            //自测
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dayTest:{
            //每日题库
            type: DataTypes.TEXT,
            allowNull: true,
        },
        applied:{
            //已报名
            type: DataTypes.TEXT,
            allowNull: true,
        }

    }, {
        tableName: 'user'
    });
};
