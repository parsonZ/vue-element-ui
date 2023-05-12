const { v4: uuidv4 } = require('uuid');
const util = require('../../util.js')

module.exports = (req, res) => {
  const uuid = uuidv4()

  const addArticles = async () => {
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

  const addArticleDetails = async () => {
    let sql = `insert into articles_details values(?,?)`
    const sql_param = [
      uuid,
      req.body.content
    ]
    return util.requestHandle({sql, sql_param})
  }

  const id = req.body.id

  const add = async () => {
    await addArticles()
    await addArticleDetails()
    return {message: '发布成功',status: 200}
  }

  const updateArticle = async () => {
    const sql = `
      update articles set create_time=?,update_time=?,user_id=?,avatar_name=?,avatar_img=?,title=?,tag_name=? where id = ?
    `
    const sql_param = [
      req.body.create_time,
      req.body.update_time,
      req.body.user_id,
      req.body.avatar_name,
      req.body.avatar_img,
      req.body.title,
      req.body.tag_name,
      id
    ]
    return util.requestHandle({sql, sql_param})
  }

  const updateArticleDetail = async () => {
    let sql = `update articles_details set content=? where id = ?`
    const sql_param = [
      req.body.content,
      id
    ]
    return util.requestHandle({sql, sql_param})
  }

  const update = async () => {
    await updateArticle()
    await updateArticleDetail()
    return {
      message: '更新成功',
      status: 200
    }
  }

  if (id) {
    update().then((data)=> {
      res.send(data)
    })
  } else {
    add().then((data)=> {
      res.send(data)
    })
  }
}
