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
//使用模板来渲染页面
let ejs = require('ejs')
//将模板引擎与express应用相关联
app.set('views',"views")//设置视图对应的目录
app.set("view engine","ejs")//设置默认的模板引擎
app.engine("ejs",ejs.__express)//定义模板引擎


app.get("/",async (req,res)=>{
    //数据库book表前28的book获取出来
    let strSql = "select id,bookname,bookimg,author,cataory from book limit 0,28"
    let result = await sqlQuery(strSql)//需要加async await,不然输出结果为：Promise{<pending>}
    //console.log(result)
    //let resJson = JSON.stringify(Array.from(result))
    //res.json(Array.from(result))
    res.render('index.ejs',{title:"lcbook首页"})

})
app.get("/xiaoshuowenxue",async (req,res)=>{  
    let strSql = "select id,bookname,bookimg,author,cataory from book where cataory = '小说文学' limit 0,28"
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})
app.get("/books/:bookid",async (req,res)=>{
    let strSql = "select * from book where id = ?"
    let bookid = req.params.bookid
    let result = await sqlQuery(strSql,[bookid])
    res.json(Array.from(result))
})

module.exports = app
