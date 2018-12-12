const util = require('../../../util.js');
const uuid = require('node-uuid');
//添加评论
module.exports = (req, res) => {
  if (!req.query.comment.length) {
    res.send({
      message: '评论内容不能为空'
    })
    return false;
  }
  
  const addComment = () => {
    return util.requestHandle({
      sql: "INSERT INTO `test`.`comment` (`c_id`, `target_id`, `parent_id`, `to_c_id`, `from_id`, `to_id`, `content`, `resp_count`, `like_count`, `create_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      sql_param: [
        uuid.v4(),
        req.query.targetid,
        req.query.parentid ? req.query.parentid : '-1',
        req.query.tocid ? req.query.tocid : '-1',
        req.query.userid,
        req.query.artUserid,
        req.query.comment,
        0,
        0,
        util.getTime()
      ]
    })
  }

  const getCurrentComment = (id) => {
    return util.requestHandle({
      sql: `select * from comment where id = ?`,
      sql_param: [id]
    })
  }

  const updRespCount = () => {
    return util.requestHandle({
      sql: 'update comment set resp_count = resp_count + 1 where c_id = ?',
      sql_param: [req.query.parentid]
    })
  }

  const getFromUser = (r2) => {
    return util.requestHandle({
      sql: 'select * from user where id = ?',
      sql_param: [r2.from_id]
    })
  }
  const getToUser = (r2) => {
    return util.requestHandle({
      sql: 'select * from user where id = ?',
      sql_param: [r2.to_id]
    })
  }

  const process_end = async () => {
    let r1 = await addComment()
    let r11 = await updRespCount()
    let r2 = await getCurrentComment(r1.insertId)
    let r21 = await getFromUser(r2[0])
    let r22 = await getToUser(r2[0])
    r2[0]['fromUser'] = r21[0]
    r2[0]['toUser'] = r22[0]
    return r2
  }

  process_end().then(response => {
    res.send({
      current: response[0],
      status: 200 
    })
  })
}