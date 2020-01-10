let crypto = require("crypto");
let systemService = {
    encrypt: function (data, key) { // 密码加密
        let cipher = crypto.createCipher("bf", key);
        let newPsd = "";
        newPsd += cipher.update(data, "utf8", "hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },
    decrypt: function (data, key) { //密码解密
        let decipher = crypto.createDecipher("bf", key);
        let oldPsd = "";
        oldPsd += decipher.update(data, "hex", "utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    },

    // getKeyArrByTokenId: function (tokenId) {
    //     var newLink = this.decrypt(tokenId, settings.encrypt_key);
    //     var keyArr = newLink.split('$');
    //     return keyArr;
    // }
}
module.exports = systemService;
