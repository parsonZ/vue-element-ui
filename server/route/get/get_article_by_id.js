const util = require('../../util.js');

module.exports = (req, res) => {
  const getArticlesById = async () => {
    const id = req.query.id
    const sql = `select articles_details.*, articles.* from articles_details join articles where articles.id = ? and articles.id= articles_details.id`
    const sql_param = [id]
    return util.requestHandle({
      sql,
      sql_param
    });
  }

  getArticlesById().then(data => {
    res.send({
      status: 200,
      message: 'success',
      data: data[0],
    })
  }).catch( err => {
    return false
  })
}

