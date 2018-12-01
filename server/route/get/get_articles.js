const util = require('../../util.js')

module.exports = (req, res) => {
  let sql, sql_param;
  if (req.query.tag_type) {
    sql = 'SELECT a.*, b.avatar_name, b.avatar_img FROM articles a LEFT JOIN user b ON a.user_id = b.id where a.tag_type in (?) order by a.create_time limit ?,?; SELECT count(*) as `counts` FROM `articles` where `tag_type` in (?);'; //分页
    sql_param = [Number(req.query.tag_type), (req.query.page-1)*req.query.counts, Number(req.query.counts), Number(req.query.tag_type)];
  } else {
    sql = 'SELECT a.*, b.avatar_name, b.avatar_img FROM articles a LEFT JOIN user b ON a.user_id = b.id order by a.create_time limit ?,?; SELECT count(*) as counts FROM articles;'; //分页
    sql_param = [(req.query.page-1)*req.query.counts, Number(req.query.counts)];
  }
  util.requestHandle({ sql, sql_param}).then(response => {
    res.send({
      status: 200,
      message: 'success',
      list: response[0],
      counts: response[1][0].counts
    })
  }).catch(err => {
    res.send({
      status: 500,
      message: err,
    })
  })
}

