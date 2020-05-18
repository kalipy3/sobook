/*
 * lcMysql.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */

let mysql = require("mysql")

let options = {
    host:"192.168.43.1",
    user:"root",
    password:"Abcd1234",
    database:"book"
}

let con = mysql.createConnection(options)

con.connect((err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log("数据库连接成功")
    }
})

function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery
