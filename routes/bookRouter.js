/*
 * bookRouter.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */

var express = require('express');
var router = express.Router();
let sqlQuery = require('../lcMysql.js')


//进入详情页，必须登录
//1.引入cookie,session模块
//2.引入一个判断是否登录的中间件
function isLoginMid(req, res, next) {
    if (req.session.username == undefined) {
        //res.send("未登录")
        res.render('info.ejs', {
            title:"未登录",
            content:"未登录，请进入登陆页面登陆",
            href:"/login",
            hrefTxt:"登录页"
        })
    } else {
        //登录进入正常页面
        next()
    }
}
//3.登录界面
router.get('/:bookid',isLoginMid, async (req,res)=>{
    console.log(req.session.username)
    let strSql = "select * from book where id = ?";
    let bookid = req.params.bookid;
    let result = await sqlQuery(strSql,[bookid])
    let options = {
      book:result[0]
    }
    //console.log(result)
    //res.send(bookid)
    res.render('bookInfo.ejs',options)
})

router.get('/out/exitSession',(req,res)=>{
    req.session.destroy(()=>{
        console.log("销毁session完毕")
    })
    res.send("成功退出！")
})

module.exports = router;

