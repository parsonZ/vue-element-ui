const mysql = require("mysql")
const connection = mysql.createConnection({
  host: "parsonz.xyz",
  port: 3306,
  user: "root",
  password: "pang800820zong",
  database: "test",
  multipleStatements: true
})
connection.connect(function(err){
  if(err){
    return err
  }else{
    console.log("mysql connecting")
  }
})

module.exports = connection
