const uuid = require('node-uuid');
const util = require('../../../util.js');
// console.log(uuid.v4())
module.exports = (req, res) => {
  //获取一级评论
  const get_level1_list = () => {
    let r = async () => {
      let r1 = await util.requestHandle({
        sql: `select * from comment where target_id = ? and parent_id = '-1' and to_id = ?`,
        sql_param: [req.query.targetid, req.query.artUserid]
      })
      //获取user
      for(let item of r1){
        let r11 = await util.requestHandle({
          sql: 'select * from user where id = ?',
          sql_param: [item.from_id]
        })
        let r12 = await util.requestHandle({
          sql: 'select * from user where id = ?',
          sql_param: [item.to_id]
        })
        item['fromUser'] = r11[0]
        item['toUser'] = r12[0]
      }
      return r1
    }
    return r()
  }
  //获取二级评论
  const get_level2_list = list => {
    let r = async () => {
      for(let item of list) {
        item['topComments'] = await util.requestHandle({
          sql: `select * from comment where target_id = ? and parent_id = ?`,
          sql_param: [item.target_id, item.c_id]
        })

        for(let item1 of item.topComments) {
          let r11 = await util.requestHandle({
            sql: 'select * from user where id = ?',
            sql_param: [item.from_id]
          })
          let r12 = await util.requestHandle({
            sql: 'select * from user where id = ?',
            sql_param: [item.to_id]
          })
          item['fromUser'] = r11[0]
          item['toUser'] = r12[0]
        }
      }
      return list;
    }
    return r();
  }
  //进程结束
  const process_end = async () => {
    let r1 = await get_level1_list();
    let r2 = await get_level2_list(r1)
    return r2
  }

  process_end().then(response => {
    res.send({
      comments: response,
      status: 200
    })
  }).catch(err => {
    return false;
  })

  
}