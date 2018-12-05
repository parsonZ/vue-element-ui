const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'select id, username, email, create_time, avatar_name, avatar_img from user where id = ?;';
  let sql_param = [req.query.id];

  const getUserInfo = async () => {
    let response = await util.requestHandle({sql, sql_param})
    return response;
  }

  getUserInfo().then(response => {
    res.send({
      status: '200',
      message: '查询成功',
      userinfo: response[0]
    })
  }).catch(err => {
    return false;
  })
}