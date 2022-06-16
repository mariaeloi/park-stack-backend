const HTTP = require('../constants/http');

function responseOk(body, message = {}) {
    return {
        status: HTTP.OK,
        body,
        message,
        errors: {},
        timestamp: new Date().getTime()
    }
}

function responseCreated(body, message) {
    return {
        status: HTTP.CREATED,
        body,
        message,
        errors: {},
        timestamp: new Date().getTime()
    }
}

function responseBadRequest(message, errors = {}) {
    return {
        status: HTTP.BAD_REQUEST,
        body: {},
        message,
        errors,
        timestamp: new Date().getTime()
    }
}

module.exports = { responseOk, responseCreated, responseBadRequest };