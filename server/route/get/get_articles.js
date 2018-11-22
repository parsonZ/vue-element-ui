const util = require('../../util.js')
const db = require('../../../mysql.js');

module.exports = (req, res) => {
  let sql, sql_param;
  if (req.query.tag_type) {
    sql = 'select * from articles where tag_type in (?) limit ?,?; SELECT count(*) as counts FROM articles where tag_type in (?);'; //分页
    sql_param = [req.query.tag_type, (req.query.page-1)*req.query.counts, Number(req.query.counts), req.query.tag_type];
  } else {
    sql = 'select * from articles limit ?,?; SELECT count(*) as counts FROM articles;'; //分页
    sql_param = [(req.query.page-1)*req.query.counts, Number(req.query.counts)];
  }
  util.requestHandle({ sql, sql_param}).then(response => {
    res.send({
      status: 200,
      message: 'success',
      list: response[0],
      counts: response[1][0].counts
    })
  })
}

