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
        books:Array.from(result),
        cataorys:await getCataory()
    }
    res.render('bookIndex.ejs',options)
})

//设置搜索路由
app.get('/search/:searchKey',async (req,res)=>{
    let sqlStr = "select id,bookname,bookimg,author,cataory from book where bookname like '%"+req.params.searchKey+"%' or author like '%"+req.params.searchKey+"%' limit 0,28"
    let result = await sqlQuery(sqlStr)

    let options = {
        books:Array.from(result),
        cataorys:await getCataory()
    }
    res.render('bookIndex.ejs',options)

})


//设置分类页面的路由
app.get("/cataory/:cataoryid",async (req,res)=>{
    let sqlStr = "select id,bookname,bookimg,author,cataory from book where cataory in (select cataory from cataory where id = ?) limit 0,28"
    let arr = [req.params.cataoryid]
    let result = await sqlQuery(sqlStr,arr)

    let options = {
        books:Array.from(result),
        cataorys:await getCataory()
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


async function getCataory(){
    //获取所有分类
    let sqlStr = "select * from cataory"
    let result = await sqlQuery(sqlStr)
    return Array.from(result)
}

module.exports = app
