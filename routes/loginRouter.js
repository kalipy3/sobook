var express = require('express');
var router = express.Router();
let sqlQuery = require('../lcMysql')
var crypto = require('crypto')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});


function jiami(str) {
    let salt = "afsddasfjkhsdakjfhsadfkjsdahfksadj"
    let obj = crypto.createHash('md5')
    str = salt+str
    obj.update(str)
    return obj.digest('hex')
}

router.post('/',async function(req,res){
    console.log(req.body)
    //根据提交者用户名判断账号是否正确
    let strSql = "select * from user where username=? and password=?"
    let arr = [req.body.username,jiami(req.body.password)]
    let result = await sqlQuery(strSql,arr)
    if (result.length != 0) {
        //登录成功
        user = result[0]
        req.session.username = user.username
        res.render('info',{
            title:"登录成功",
            content:"账号密码正确，即将进入首页",
            href:"/",
            hrefTxt:"首页"
        })
    } else {
        res.render('info',{
            title:"登录失败",
            content:"账号密码错误，即将进入登录页",
            href:"/login",
            hrefTxt:"登录页"
        })
    }

})

module.exports = router;
