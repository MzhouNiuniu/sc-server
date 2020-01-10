var mysql = require('mysql-pro');
var config = require('../config/settings.js')

var db  =new mysql({
    mysql:{
        host     : config.HOST,
        user     : config.USERNAME,
        password : config.PASSWORD,
        database : config.DB,
        port     : config.PORT
    }
});
module.exports =  db
