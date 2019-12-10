var fs = require('fs');

var getHtml = require('./page-tpl');
var getArticleTpl = require('./article-tpl');


/**
 * 添加文章
 * @param {*} articlePath 
 * @param {*} data 
 * @param {*} cb 
 * 
{
  id: 00001,
  title: '',
  content: '',
  type: '',
  dateTime: '',
  ip: ''
}
 */
function addArticle(articlePath, data, cb = () => { }) {
    if (typeof data !== 'object') {
        cb('{success: false}');
        return;
    }
    if (!(data.title && !data.title.indexOf('0418'))) {
        cb('{success: false, msg: "没有权限"}');
        return;
    }
    data.title = data.title && data.title.slice(4);

    var path = articlePath;
    if (data.type) {
        path += '/' + data.type;
    }
    path += '/' + data.title + '-' + data.dateTime + '.html';

    var articleTpl = getArticleTpl(data);
    var html = getHtml(articleTpl, data.title);

    fs.writeFile(path, html, function (err) {
        if (err) {
            cb(err);
        } else {
            cb();
        }
    });
}

module.exports = addArticle;
