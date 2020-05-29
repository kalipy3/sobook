/*
 * registerRouter.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */

var express = require('express');
var router = express.Router();
var sqlQuery = require('../lcMysql')

/* GET users listing. */
//登录页有个注册按钮，可以切换到注册页form
router.get('/', function(req, res, next) {
  res.render('login')
});

router.post('/',async function(req,res){
    //获取表单提交的邮箱，密码，用户名
    console.log(req.body)
    let mail = req.body.mail
    let password = req.body.password[0]
    let username = req.body.username
    //判断邮箱是否已经注册，如果已经注册，将不再注册
    let strSql = "select * from user where mail = ?"
    let result = await sqlQuery(strSql,[mail])
    if (result.length!=0) {
        //已经注册过
        res.render('info',{
            title:"注册失败",
            content:"该邮箱已经注册过啦，可直接登录，或者寻找密码",
            href:"/register",
            hrefTxt:"注册页"
        })

    } else {
        //未注册，可以注册
        strSql = "insert into user (mail,username,password) values (?,?,?)"
        await sqlQuery(strSql,[mail,username,password])
        res.render('info',{
            title:"注册成功",
            content:"注册成功，即将进入登录页面",
            href:"/login",
            hrefTxt:"登录页"
        })
    }
})

module.exports = router;
