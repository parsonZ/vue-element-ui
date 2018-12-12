const util = require('../../../util.js');

module.exports = (req, res) => {
  //获取一级评论
  const get_level1_list = () => {
    let r = async () => {
      let r1 = await util.requestHandle({
        sql: `select * from comment where target_id = ? and parent_id = '-1' and to_id = ? order by create_time desc`,
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
        //用户是否已经点赞
        let r13 = await util.requestHandle({
          sql: 'select * from comment_isliked where c_id = ? and user_id = ?',
          sql_param: [item.c_id, req.query.userid]
        })
        item['isLiked'] = r13.length ? true : false
        item['fromUser'] = r11[0]
        item['toUser'] = r12[0]
        item['showForm'] = false
        item['value'] = ''
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
          console.log(item1)
          let r11 = await util.requestHandle({
            sql: 'select * from user where id = ?',
            sql_param: [item1.from_id]
          })
          let r12 = await util.requestHandle({
            sql: 'select * from user where id = ?',
            sql_param: [item1.to_id]
          })
          //用户是否已经点赞
          let r13 = await util.requestHandle({
            sql: 'select * from comment_isliked where c_id = ? and user_id = ?',
            sql_param: [item1.c_id, req.query.userid]
          })
          item1['isLiked'] = r13.length ? true : false
          item1['fromUser'] = r11[0]
          item1['toUser'] = r12[0]
          item1['showForm'] = false
          item1['value'] = ''
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