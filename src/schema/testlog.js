// 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
// primaryKey  定义一个主键
// autoIncrement 选项用于创建一个自增的整型列
var moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('testlog', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            //DATE
            type: DataTypes.DATE,
            allowNull: true,
        },
        answer:{

            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        openid:{
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        questionBankId:{
            type: DataTypes.STRING(255),
            allowNull: true,
        }

    }, {
        tableName: 'testlog'
    });
};
