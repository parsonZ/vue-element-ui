const util = require('../../util.js');
var hljs = require('highlight.js');
var fs = require('fs');
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
});
const path = require('path');
const articlesPath = path.resolve('./articles')

module.exports = (req, res) => {
  // let sql = 'select a.*, b.content from articles a join article_details b on a.id = b.id where b.id = ?';
  // let sql_param = [req.params.id]
  fs.readFile(articlesPath + '/test.md', { encoding: 'utf8' }, function (err, data){
    res.send({
      data: marked(data)
    })
  })
}

