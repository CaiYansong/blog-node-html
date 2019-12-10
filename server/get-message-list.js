var fs = require('fs');

function getMessageList(messagePath, cb) {
    // 读取文件
	try{
		var buffer = fs.readFileSync(messagePath);
		var str = String(buffer);
		str = str.slice(1);
		if (str.slice(0, 1)==',') {
			str = str.slice(1);
		}
		cb('[' + str + ']');
	}catch(err){
		cb(JSON.stringify(err));
	}
}

module.exports = getMessageList;