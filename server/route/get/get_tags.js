const util = require('../../util.js')

module.exports = (req, res) => {

  const getUserTags = () => {
    let user_tags = 'select tags from user where id = ?';
    return util.requestHandle({ sql: user_tags, sql_param: [req.query.userid]})
  }
  const getTags = tagids => {
    let tags = 'select * from tag';
    if (tagids) {
      tags += ' where tag_name in('+tagids.split(',').map(v => `"${v}"`).join(',')+')'
    }
    return util.requestHandle({ sql: tags, sql_param: []})
  }

  const getLinks = () => {
    let links = `SELECT * from tag_link`;
    return util.requestHandle({ sql: links, sql_param: []})
  }

  const get_tags = async () => {
    let results;
    if (req.query.userid) { //按id查
      results = await getUserTags()
    }

    let results1 = await getTags( results ? results[0].tags : false)
    let results2 = await getLinks()

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
        if(item.tag_name === value.tag_name) {
          item.links.push(value)
        }
      })
      return item
    })
    res.send({
      status: 200,
      message: 'success',
      list: r1,
    })
  }).catch(err => {
    console.log(err)
  })
}

