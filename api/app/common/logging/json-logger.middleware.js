'use strict';

const morgan = require('morgan');
const os = require('os');

morgan.token('conversation-id', function getConversationId(req) {
    return req.conversationId;
});
morgan.token('session-id', function getSessionId(req) {
    return req.sessionId;
});
morgan.token('instance-id', function getInstanceId(req) {
    return req.instanceId;
});
morgan.token('hostname', function getHostname() {
    return os.hostname();
});
morgan.token('pid', function getPid() {
    return process.pid;
});

module.exports = function loggingMiddleware() {
    return morgan(jsonFormat);
};

function jsonFormat(tokens, req, res) {
    return JSON.stringify({
        'ip': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'method': tokens['method'](req, res),
        'uri': tokens['url'](req, res),
//        'http-version': tokens['http-version'](req, res),
        'status': tokens['status'](req, res),
        'length': tokens['res'](req, res, 'content-length'),
        'ref': tokens['referrer'](req, res),
        'agent': tokens['user-agent'](req, res),
//        'cid': tokens['conversation-id'](req, res),
//        'sid': tokens['session-id'](req, res),
        'hname': tokens['hostname'](req, res),
//        'iid': tokens['instance-id'](req, res),
        'rtime': tokens['response-time'](req, res),
        'pid': tokens['pid'](req, res)
    });
}