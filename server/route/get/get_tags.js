const util = require('../../util.js')

module.exports = (req, res) => {
  let tags = 'select * from tag';
  let links = 'SELECT a.tag_id, b.link_href, c.name AS tag_name, c.icon FROM tag a JOIN tag_link b ON a.tag_id = b.tag_id JOIN tag_link_type c ON b.link_type_id = c.id ORDER BY a.tag_name , c.name';
  const get_tags = async () => {
    let results1 = await util.requestHandle({ sql: tags, sql_param: []})
    let results2 = await util.requestHandle({ sql: links, sql_param: []})
    return {
      results1,
      results2
    };
  }
  get_tags().then(response => {
    let r1 = response.results1;
    let r2 = response.results2;
    r1.map(item => {
      item['links'] = new Array();
      r2.find((value, index, arr) => {
        if(item.tag_id == value.tag_id) {
          item.links.push(value)
        }
      })
      return item
    })
    res.send(obj = {
      status: 200,
      message: 'success',
      list: r1,
    })
  }).catch(err => {
    return false
  })
}

