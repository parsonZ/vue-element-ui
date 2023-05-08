const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'SELECT * from user where username = ?';
  let sql_param = [req.body.name];
  let obj = {}
  const logins = async () => {
    let results = util.requestHandle({sql, sql_param});
    return results;
  }
  logins().then(data => {
    if (!data.length) {
      obj = {
        status: 500,
        message: '用户不存在'
      }
    } else {
      console.log(data[0].password, req.body.password, 111)
      if (util.valid.equals(data[0].password, req.body.password)) {
        data[0].password = '';
        obj = {
          status: 200,
          message: '登录成功',
          info: data[0]
        }
        req.session.username = req.body.name
      } else {
        obj = {
          status: 500,
          message: '密码错误'
        }
      }
    }
    res.send(obj)
  }).catch(err => {
    return false
  })
}