var fs = require('fs');

function addMessage(messagePath, data, cb) {
    if (!data) {
        cb('{success: false}');
        return;
    }
    if (!(data.value && !data.value.indexOf('0418'))) {
        cb('{success: false, msg: "没有权限"}');
        return;
    }
    if (typeof data === 'object') {
        data.value = data.value && data.value.slice(4);
        if (!data.value) {
            return;
        }
        data = JSON.stringify(data);
    }
    data = ',' + data;
    fs.writeFile(messagePath, data, { flag: 'a' }, function (err) {
        if (err) {
            cb(err);
        } else {
            cb();
        }
    });
}

module.exports = addMessage;