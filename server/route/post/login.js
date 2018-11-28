const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = ?';
  let sql_param = [req.body.name];
  let obj = {}
  util.requestHandle({sql, sql_param}).then(data => {
    if (!data.length) {
      obj = {
        status: 0,
        message: '用户不存在'
      }
    } else {
      if (util.valid.equals(data[0].password, req.body.password)) {
        obj = {
          status: 200,
          message: '登录成功'
        }
      } else {
        obj = {
          status: 0,
          message: '密码错误'
        }
      }
    }
    res.send(obj)
  }).catch(err => {
    res.send({
      status: 500,
      message: err,
    })
  })
}