const util = require('../../util.js')

module.exports = (req, res) => {
  
  //获取user信息
  const getUser = () => {
    let sql = 'select id, username, email, create_time, avatar_name, avatar_img from user where id = ?;';
    let sql_param = [req.query.id];
    return util.requestHandle({sql, sql_param})
  }

  const getUserTags = () => {
    let sql = 'select tags from user where id = ?';
    let sql_param = [req.query.id];
    return util.requestHandle({sql, sql_param})
  }

  //获取user的tags信息
  const getTags= (tags_id) => {
    let sql = 'select * from tag where tag_id in ('+tags_id+')';
    let sql_param = []
    return util.requestHandle({sql, sql_param})
  }

  const getUserInfo = async () => {
    let r1 = await getUser()
    let r2 = await getUserTags()
    let r3 = await getTags(r2[0].tags)

    return {
      r1, r3
    };
  }

  getUserInfo().then(response => {
    response.r1[0]['tags'] = response.r3
    res.send({
      status: '200',
      message: '查询成功',
      userinfo: response.r1[0]
    })
  }).catch(err => {
    return false;
  })
}