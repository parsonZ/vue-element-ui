const uuid = require('node-uuid');
const util = require('../../../util.js');
// console.log(uuid.v4())
module.exports = (req, res) => {
  //获取一级评论
  const get_level1_list = () => {
    return util.requestHandle({
      sql: `select * from comment where target_id = ? and parent_id = '-1' and to_id = ?`,
      sql_param: [req.query.targetid, req.query.artUserid]
    })
  }
  //获取二级评论
  const get_level2_list = list => {
    list.map(item => {
      util.requestHandle({
        sql: `select * from comment where target_id = ? and c_id = ?`,
        sql_param: [item.target_id, item.c_id]
      })
    })

    console.log(list)
  }

  const process_end = async () => {
    let r1 = await get_level1_list();
    let r2 = await get_level2_list(r1)
  }

  process_end().then(response => {
    
  })

  res.send('mp')
}