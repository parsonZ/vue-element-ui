module.exports = {
  requestHandle(params){
    const promise = new Promise((resolve, reject) => {
      params.req.sql.query(params.statement, (error, results, fields) => {
        if (error) {
            reject(error)
        } else {
            resolve(results)
        }
      })
    })
    .catch(err => {
        console.log(err)
    })

    return promise;
  }
}