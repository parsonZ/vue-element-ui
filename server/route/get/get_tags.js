const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'select * from tag';
  util.requestHandle({ sql, sql_param: [] }).then(response => {
    async function as () {
      for(let item of response){
        let sql = 'select b.link_href, c.name as tag_name, c.icon from tag a join tag_link b on a.id = b.tag_id join tag_link_type c on b.tag_link_type_id = c.id where a.id = ? order by a.name, c.name';
        await util.requestHandle({ sql, sql_param: [item.id] }).then(r => {
          item['links'] = r
        });
      }
      return response
    }

    as().then(r => {
      res.send(obj = {
        status: 200,
        message: 'success',
        list: r
      })
    })
  }).catch(err => {
    res.send({
      status: 500,
      message: 'error',
      list: '数据库连接错误'
    })
  })
}

