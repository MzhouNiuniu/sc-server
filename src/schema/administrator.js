/* jshint indent: 2 */
// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('administrator', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        userName:{
            type: DataTypes.STRING,
            allowNull: true
        },
        password:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        releaseTime:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue:  moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        },
    }, {
        tableName: 'administrator'
    });
};
