/**
 * Created by Administrator on 2015/5/30.
 */

const logUtil = require('./middleware/logUtil')

var siteFunc = {
    // 封装api返回的数据
    renderApiData(res, responseCode, responseMessage, data = {}, type ) {

        if (type == 'getlist') {
            responseMessage = res.__("validate_error_getSuccess", { success: responseMessage })
        }

        let sendData = {
            code: responseCode,
            message: responseMessage,
            server_time: (new Date()).getTime(),
            data
        }
        return sendData;
    },
    renderApiErr(ctx,responseCode, responseMessage) {

        responseMessage=responseMessage.message
        let errorData = {
            code: responseCode,
            message: responseMessage,
            server_time: (new Date()).getTime(),
            data: {}
        }
        // 记录错误日志
        logUtil.error(responseMessage, ctx.request);
        return errorData;
    },


};
module.exports = siteFunc;
