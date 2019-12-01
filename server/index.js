var express = require("express");
var getArticles = require('./get-articles');
var getArticleTypes = require('./get-article-types');

var getHtml = require('./page-tpl');

var app = express();

var articlesPath = '../article-list'

app.use(express.static('../public'));
app.use('/article-list', express.static(articlesPath));
app.use('/imgs', express.static('../imgs'));

// 监听资源文件夹，进入对应文件夹，显示其文件列表
addStaticListener(articlesPath);
var fileNames = [];
getArticleTypes(articlesPath, fileNames);
fileNames.map(function (item) {
    addStaticListener(item);
});

/**
 * 静态资源监听，返回对应的文件列表
 * @param {String} path 文件的本地路径
 */
function addStaticListener(path) {
    var url = path.replace(/^(\.\.)|(\.)/, '');
    app.get(url, function (req, res) {
        var fileNames = [];

        getArticles(path, fileNames);
        var linkTpl = '<a href="{href}">{title}</a>';
        var html = '';
        fileNames.map(function (item) {
            var href = item.replace(/^(\.\.)|(\.)/, '');
            var link = linkTpl.replace('{href}', href);

            var title = '';
            item.replace(/\/([^\/]+)\.html$/, function (val, $1) {
                title = $1;
            });
            var link = link.replace('{title}', title);
            html += link + '<br/>';
        });

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(getHtml(html));
    });
}

/**
 * 文章类型列表
 */
app.get('/article-type-list', function (req, res) {
    var types = [];

    getArticleTypes(articlesPath, types);

    var linkTpl = '<a href="{href}">{type}</a>';
    var html = '<a href="/article-list">全部</a><br/>';
    types.map(function (item) {
        var href = '/' + item;
        var link = linkTpl.replace('{href}', href);

        var type = '';
        item.replace(/\/[^\/]+$/, function (val) {
            type = val;
        });
        var link = link.replace('{type}', type);
        html += link + '<br/>';
    });

    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(getHtml(html));
});

// post的请求方式.get('pathName',fn);
app.post('/', function (req, res) {
    res.end('111s1');
});

// 监听端口
app.listen(80, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});