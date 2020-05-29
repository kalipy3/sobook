/*
 * uploadRouter.js
 * Copyright (C) 2020 android <android@localhost>
 *
 * Distributed under terms of the MIT license.
 */
var express = require('express');
var fs = require('fs')
var router = express.Router();
//引入上传模块
let multer = require('multer')
//配置上传对象
let upload = multer({dest:"./public/upload"})
//var upload=multer({dest:'./upload/',limits:{fileSize:1024*1024*20,files:5}})
//fileSize:1024*1024*20,设置的大小为20mb
//files:最大上传文件数

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('uploadimg.ejs')
});

//处理上传的post请求
//如果上传的单个文件，可调用upload.single(’imgfile‘)方法，并且将表单文件的name值传入
router.post('/',upload.single('imgfile'),function(req,res){
    console.log(req.file)
    //因为直接上传的文件为随机字符名字，我们想要重新命名
    let oldPath = req.file.destination+"/"+req.file.filename
    let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname
    fs.rename(oldPath, newPath, ()=>{
        console.log("改名成功")
    })
    res.send("上传成功")
})

module.exports = router;

