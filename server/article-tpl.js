var pageTpl = '<h1 class="article-title" style="text-align: center;margin: 0;padding: 10px;">$!{title} [$!{type}]</h1><div class="article-info" style="text-align: center;">$!{dateTime}</div><div class="article-content">$!{content}</div>';

function getArticleTpl(obj) {
    var html = pageTpl;
    if (obj.type) {
        html = html.replace('$!{type}', obj.type);
    } else {
        html = html.replace('[$!{type}]', '');
    }
    html = html.replace('$!{title}', obj.title);
    html = html.replace('$!{dateTime}', new Date(obj.dateTime));
    html = html.replace('$!{content}', obj.content);
    return html;
}

module.exports = getArticleTpl;
