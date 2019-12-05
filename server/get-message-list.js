var fs = require('fs');
var buf = new Buffer.alloc(1024);

function getMessageList(messagePath, cb) {
    // 读取文件
    fs.open(messagePath, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }

            // 仅输出读取的字节
            if (bytes > 0) {
                var str = buf.slice(0, bytes).toString();
                str = str.slice(1);
                if (str.slice(0, 1) === ',') {
                    str = str.slice(1);
                }
                cb('[' + str + ']');
            }

            // 关闭文件
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
}

module.exports = getMessageList;
