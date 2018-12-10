const util = require('../../util.js');

module.exports = (req, res) => {
  /*
  req.query.name: 'collect', 'like'
  */
  /*
  req.query.type: 0-取消 1-操作
  */

  let operate;
  if (req.query.type == 0) {
    operate = async () => {
      let r1 = await util.requestHandle({
        sql: `delete from ${req.query.name} where ${req.query.name}_article_id = ? and ${req.query.name}_user = ?`,
        sql_param: [req.query.articleid, req.query.userid]
      })

      let r2 = await util.requestHandle({
        sql: `update articles set ${req.query.name}_count = ${req.query.name}_count - 1 where id = ?`,
        sql_param: [req.query.articleid]
      })

      return r1;
    }
  } else {
    operate = async () => {
      let r1 = await util.requestHandle({
        sql: `INSERT INTO ${req.query.name} (${req.query.name}_user, ${req.query.name}_article_id, ${req.query.name}_time) VALUES (?, ?, ?)`,
        sql_param: [req.query.userid, req.query.articleid, util.getTime()]
      })

      let r2 = await util.requestHandle({
        sql: `update articles set ${req.query.name}_count = ${req.query.name}_count + 1 where id = ?`,
        sql_param: [req.query.articleid]
      })

      return r1;
    }
  }

  operate().then(response => {
    util.requestHandle({ //重置自增id
      sql: `alter table ${req.query.name} auto_increment = 1`,
      sql_param: []
    })

    res.send({
      message: response.affectedRows == 1 ? '操作成功' : '操作失败',
      status: response.affectedRows == 1 ? 200 : 500
    })
  }).catch(err => {
    return false;
  })
}
