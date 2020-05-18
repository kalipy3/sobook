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
    //插入变量
    let options = {
        title:"lcbook首页",
        articleTitle:"<h1>文章标题</h1>"
    }
    res.render('index.ejs',options)

})
app.get("/tj",async (req,res)=>{  
    //条件
    let options = {
        "username":"小明",
        "gender":"男"
    }
    res.render('condition.ejs',options) 
})
app.get("/xh",async (req,res)=>{
    //循环
    let stars = ["蔡徐坤","南怀瑾","悉达多","lc"]
    let options = {
        stars
    }
    res.render('xh.ejs',options)
})

module.exports = app
