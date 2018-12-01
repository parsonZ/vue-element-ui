const util = require('../../util.js')

module.exports = (req, res) => {
  let sql = 'select * from tag';
  util.requestHandle({ sql, sql_param: [] }).then(response => {
    async function as () {
      for(let item of response){
        let sql = 'SELECT b.link_href, c.name AS tag_name, c.icon FROM tag a JOIN tag_link b ON a.tag_id = b.tag_id JOIN tag_link_type c ON b.link_type_id = c.id WHERE a.tag_id = ? ORDER BY a.tag_name , c.name';
        await util.requestHandle({ sql, sql_param: [item.tag_id] }).then(r => {
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
      message: err,
    })
  })
}

