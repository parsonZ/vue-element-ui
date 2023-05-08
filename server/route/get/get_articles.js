const util = require('../../util.js')

module.exports = (req, res) => {
  let sql, sql1, sql_param, sql1_param;
  if (req.query.tag_type) {
    sql = 'select * from articles where tag_name in (?) order by create_time limit ?,?;'; //分页
    sql1 = 'SELECT count(*) as `counts` FROM `articles` where `tag_name` in (?);'
    sql_param = [req.query.tag_type, (req.query.page-1)*req.query.counts, Number(req.query.counts)];
    sql1_param = [req.query.tag_type];
  } else {
    sql = 'SELECT * FROM articles order by a.create_time limit ?,?; '; //分页
    sql1 = 'SELECT count(*) as counts FROM articles;';
    sql_param = [(req.query.page-1)*req.query.counts, Number(req.query.counts)];
    sql1_param = []
  }

  const get_articles = async () => {
    let results1 = await util.requestHandle({ sql, sql_param})
    let results2 = await util.requestHandle({ sql: sql1, sql_param: sql1_param})

    return {
      results1,
      results2
    };
  }

  get_articles().then(response => {
    res.send({
      status: 200,
      message: 'success',
      list: response.results1,
      counts: response.results2[0].counts,
    })
  }).catch(err => {
    return false
  })
}

