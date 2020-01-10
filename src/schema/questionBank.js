/* jshint indent: 2 */
// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('questionBank', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        topic:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        option:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        rightAnswer:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        type:{
            //0 单选 1 多选  2判断
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        dataType:{
            // 0 前端 1 运维
            type: DataTypes.INTEGER(11),
            allowNull: true
        } ,status:{
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue:0
        },
        didNumber:{
            //阅读人数
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
        knowledgeId:{
            type:DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'questionBank'
    });
};
