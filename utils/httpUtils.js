const request = require('request').defaults({jar: true});  //允许携带cookies
const qs = require('querystring');

function getHeader(req) {
    return {
         'Authorization': req?(req.cookies.Authorization ? req.cookies.Authorization : ''):''
    };
}

class HttpUtils {
    constructor() {
    }

    httpGet(url, params, req) {
        return new Promise((resolve, reject) => request.get({
            url: `${url}?${qs.stringify(params)}`,
            method: 'get',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpGetJson(url, params, req) {
        return new Promise((resolve, reject) => request.get({
            url: url,
            method: 'get',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/json;charset=UTF-8',}),
            data: params
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpPost(url, form, req) {
        return new Promise((resolve, reject) => request.post({
            url: `${url}?${qs.stringify(form)}`,
            method: 'post',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpPostJson(url, form, req) {
        return new Promise((resolve, reject) => request.post({
            url: url,
            method: 'post',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/json;charset=UTF-8',}),
            body: form
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpPut(url, params, req) {
        return new Promise((resolve, reject) => request.put({
            url: `${url}?${qs.stringify(params)}`,
            method: 'put',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpPutJson(url, data, req) {
        return new Promise((resolve, reject) => request.put({
            url: url,
            method: 'put',
            headers: Object.assign(getHeader(req), {'Content-Type': 'application/json;charset=UTF-8',}),
            body: data
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }

    httpDelete(url, params, req) {
        let header = getHeader(req);
        return new Promise((resolve, reject) => request.delete({
            url: url,
            method: 'delete',
            headers: header,
            data: params
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        }))
    }
}

module.exports = new HttpUtils()
