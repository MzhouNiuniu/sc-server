/* jshint indent: 2 */
// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
       name:{
           type: DataTypes.STRING,
           allowNull: true
       },
       cover:{
            //封面
           type: DataTypes.TEXT,
           allowNull: true
       },
        label:{
            //标签
            type: DataTypes.TEXT,
            allowNull: true
        },
        readNumber:{
            //阅读人数
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue:0
        },
        banner:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        advantage:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        brief:{
            //简介
            type: DataTypes.STRING,
            allowNull: true
        },
        status:{
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue:0
        },
        outline:{
            //大纲
            type: DataTypes.TEXT,
            allowNull: true
        },
        releaseTime:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue:  moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        },
        auditList:{
            //审核记录
            type: DataTypes.TEXT,
            allowNull: true
        },
        stick: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0
            //0不置顶  1置顶
        },
        stickTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'course'
    });
};
