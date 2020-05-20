/*
 * app.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */

let express = require("express")
let path = require('path')
let mysql = require("mysql")
var app = express()
let sqlQuery = require("./lcMysql")

//view engine setup
app.set('views',path.join(__dirname,'views'))
app.set("view engine","ejs")

//设置静态目录
app.use(express.static(path.join(__dirname,'public')))


app.get('/',async (req,res)=>{
    let strSql = "select id,bookname,bookimg,author,cataory from book limit 0,28"
    let result = await sqlQuery(strSql)//需要加async await,不然输出结果为：Promise{<pending>}
    let options = {
        books:Array.from(result)
    }
    res.render('bookIndex.ejs',options)
})


app.get('/books/:bookid',async (req,res)=>{
    let strSql = "select * from book where id = ?"
    let bookid = req.params.bookid
    let result = await sqlQuery(strSql,[bookid])
    //res.send(bookid)
    //console.log(result)
    let options = {
        book:result[0]
    }
    res.render('bookInfo.ejs',options)
})


module.exports = app
