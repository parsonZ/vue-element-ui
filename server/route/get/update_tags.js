const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = "update user SET tags = '"+req.query.ids+"' where id = ?";
  let sql_param = [req.query.userid];
  
  const update_tags = async () => {
    let r1 = await util.requestHandle({ sql, sql_param })
    return r1;
  }

  update_tags().then(response => {
    res.send({
      status: '200',
      message: '更新成功',
    })
  }).catch(err => {
    return false;
  })
}

