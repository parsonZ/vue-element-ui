const util = require('../../util.js');

module.exports = (req, res) => {
  
// 

  const get_details = () => {
    let sql = 'select a.*, b.content from articles a join articles_details b on a.id = b.id where b.id = ?';
    let sql_param = [req.query.id]
    return util.requestHandle({ sql, sql_param});
  }

  const get_collect = () => {
    let sql = 'select * from collect where collect_article_id = ? and collect_user = ?';
    let sql_param = [req.query.id, req.query.userid];
    return util.requestHandle({sql, sql_param});
  }

  const get_liked = () => {
    return util.requestHandle({
      sql: 'select * from liked where liked_article_id = ? and liked_user = ?',
      sql_param: [req.query.id, req.query.userid]
    });
  }

  const articles_details = async () => {
    let r1 = await get_details();
    let r2 = await get_collect();
    let r3 = await get_liked();
    return { r1, r2, r3 }
  }

  articles_details().then(response => {
    res.send({
      data: response.r1.length ? response.r1[0].content : '这篇文章没有内容....',
      collected: response.r2.length ? 1 : 0,
      liked: response.r3.length ? 1 : 0
    })
  }).catch( err => {
    return false
  })
}

