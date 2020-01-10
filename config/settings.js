/**
 * Created by dora on 2017/5/19.
 *
 */

module.exports = {
    session_secret: 'doracms', // 务必修改
    auth_cookie_name: 'token',
    // 密码盐
    encrypt_key: 'CMS',
    salt_aes_key: "doracms_", // 可以解密，秘钥必须为：8/16/32位
    salt_md5_key: "dora", // MD5的盐，用于加密密码

    //    数据库配置
    // URL: 'mongodb://127.0.0.1:27017/doracms2',
    DB: 'sc',
    HOST: '127.0.0.1',
    PORT: 3306,
    USERNAME: 'root',
    PASSWORD: '123456',
    // DB: 'dry-euity',
    // HOST: '192.168.8.242',
    // PORT: 3306,
    // USERNAME: 'dry-euity',
    // PASSWORD: 'oraro@dry',

    //公众号配置
    APPID :'wx9db482df5987c784',
    appsecret :'1b017c84254610603a55619d155faccc',
    redirectUrl:'https://guoqian.np1010.com',

    //商户后台配置
    mch_id:'1514718441',
    key:'chenghongkejigufenyouxiangongsi1',
    //短信接口配置
    // sendMsgUrl:'http://192.168.8.230:30042'
    sendMsgUrl:'http://192.168.0.181:30033' ,  //线上
    baseUrl:'http://192.168.9.105:8090/upload/',
};



