const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'SELECT a.*, b.password FROM users a JOIN user_auth b on a.id = b.user_id where a.name = ?';
  let sql_param = [req.body.name];
  let obj = {}
  util.requestHandle({sql, sql_param}).then(data => {
    if (data.length) {
      obj = {
        status: 0,
        message: '用户已存在'
      }
    } else if (!util.valid.isEmail(req.body.email)){
      obj = {
        status: 0,
        message: '邮箱格式不正确'
      }
    } else if (!util.valid.equals(req.body.password, req.body.password_confirm)){
      obj = {
        status: 0,
        message: '两次密码不一致'
      }
    } else {
      //插入数据
      let addUser = 'INSERT INTO users (`name`, `identity_type`) VALUES (?,?)';
      let addUser_param = [req.body.name, '1'];

      util.requestHandle({sql: addUser, sql_param: addUser_param}).then(data => data)
      .then(data => {
        let addAuth = 'INSERT INTO user_auth (`user_id`, `identity_type`, `password`) VALUES (?,?,?)';
        let addAUth_param = [data.insertId, '1', req.body.password];
        util.requestHandle({sql: addAuth, sql_param: addAUth_param}).then()
      })
      res.send({
        status: 200,
        message: '注册成功'
      })
      return false;
    }
    res.send(obj)
  })
}