// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('test', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        content:{
            //大纲
            type: DataTypes.TEXT,
            allowNull: true
        },
        readNumber:{
            //阅读人数
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue:0
        },
        status:{
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue:0
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
            defaultValue: 0
            //0不置顶  1置顶
        },
        stickTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dataType: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'test'
    });
};
