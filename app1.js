/*
 * app.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */

let express = require("express")
let mysql = require("mysql")
let app = express()
let sqlQuery = require("./lcMysql")

app.get("/",async (req,res)=>{
    //数据库book表前28的book获取出来
    let strSql = "select * from book limit 0,28"
    let result = await sqlQuery(strSql)//需要加async await,不然输出结果为：Promise{<pending>}
    //console.log(result)
    //let resJson = JSON.stringify(Array.from(result))
    res.json(Array.from(result))
})
app.get("/xiaoshuowenxue",(req,res)=>{

})
app.get("/books/:bookid",(req,res)=>{

})

module.exports = app
