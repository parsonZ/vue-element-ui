const util = require('../../util.js')
const db = require('../../../mysql.js');

module.exports = (req, res) => {
  let sql1 = 'select * from articles limit ?,?;';
  let sql2 = 'SELECT count(*) as counts FROM articles;';
  let sql = sql1 + sql2;
  let sql_param = [(req.query.page-1)*req.query.counts, Number(req.query.counts)];
  util.requestHandle({ sql, sql_param}).then(response => {
    res.send({
      status: 200,
      message: 'success',
      list: response[0],
      counts: response[1][0].counts
    })
  })
}

