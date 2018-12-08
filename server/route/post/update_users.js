const util = require('../../util.js')

module.exports = (req, res) => {
  let param = req.body.userinfo;
  
  if (param.username.length > 20) {
    res.send({
      message: '用户名太长了',
      status: 500
    })
    return;
  }

  if (param.avatar_name.length > 10) {
    res.send({
      message: '昵称太长了',
      status: 500
    })
    return;
  }

  if (!util.valid.isEmail(param.email)) {
    res.send({
      message: '邮箱格式不正确',
      status: 500
    })
    return;
  }

  if (!util.valid.equals(param.password, param.confirm_password)) {
    res.send({
      message: '两次密码不一致',
      status: 500
    })
    return;
  }

  const getUsername = () => {
    let sql = 'select count(*) as count, id from user where username = ?';
    let sql_param = [param.username];
    return util.requestHandle({sql, sql_param})
  }

  const setUserValues = (o) => {
    if (o.count == 1 && o.id != param.id){
      return {
        message: '用户已存在',
        status: 500
      };
    } else {
      let sql = 'update user SET username=?, password=?,email=?, avatar_name=?, avatar_img=? where id = ?';
      let sql_param = [
        param.username,
        param.password,
        param.email,
        param.avatar_name,
        param.avatar_img,
        param.id
      ];
      return util.requestHandle({sql, sql_param})
    }
  }

  const updateUserInfo = async () => {
    let r1 = await getUsername()
    let r2 = await setUserValues(r1[0])
    return  r2.status == 500 ? r2 : {message: '更新成功',status: 200}
  }

  updateUserInfo().then(data => {
    res.send(data)
  })
}