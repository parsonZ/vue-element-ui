const util = require('../../util.js');

module.exports = (req, res) => {
  let sql = 'select a.*, b.content from articles a join articles_details b on a.id = b.id where b.id = ?';
  let sql_param = [req.params.id]

  const articles_details = async () => {
    let results = await util.requestHandle({ sql, sql_param})
    return results
  }

  articles_details().then(response => {
    res.send({
      data: response.length ? response[0].content : '这篇文章没有内容....'
    })
  }).catch( err => {
    console.log(err)
  })
}

