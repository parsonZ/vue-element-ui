const util = require('../../../util.js');

module.exports = (req, res) => {

  //req.query.otype == 0 --取消 
  //req.query.otype == 1 --点赞

  const updComments = async () => {
    let updCount = await util.requestHandle({
      sql: `update comment set like_count = ${req.query.otype == 1 ? 'like_count + 1' : 'like_count - 1'} where c_id = ?`,
      sql_param: [req.query.respuserCid]
    })

    let insertIsliked = await util.requestHandle({
      sql: req.query.otype == 1 ? `INSERT INTO comment_isliked (c_id, user_id) VALUES (?, ?);` : `delete from comment_isliked where c_id = ? and user_id = ?;`,
      sql_param: [req.query.respuserCid, req.query.userid]
    })

    return insertIsliked;
  }

  updComments().then(response => {
    res.send({
      message: response.affectedRows == 1 ? '操作成功' : '操作失败',
      status: response.affectedRows == 1 ? 200 : 500
    })
  }).catch(err => {
    return false
  })
}