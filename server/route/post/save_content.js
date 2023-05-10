const { v4: uuidv4 } = require('uuid');
const util = require('../../util.js')

module.exports = (req, res) => {
  const uuid = uuidv4()

  const updateArticles = async () => {
    const sql = `insert into articles values(?,?,?,?,?,?,?,?)`

    const sql_param = [
      uuid,
      req.body.create_time,
      req.body.update_time,
      req.body.user_id,
      req.body.avatar_name,
      req.body.avatar_img,
      req.body.title,
      req.body.tag_name
    ]
    return util.requestHandle({sql, sql_param})
  }

  const updateArticleDetails = async () => {
    let sql = `insert into articles_details values(?,?)`
    const sql_param = [
      uuid,
      req.body.content
    ]
    return util.requestHandle({sql, sql_param})
  }

  const update = async () => {
    await updateArticles()
    await updateArticleDetails()
    return {message: '发布成功',status: 200}
  }

  update().then((data)=> {
    res.send(data)
  })

}
