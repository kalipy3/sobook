var express = require('express');
var router = express.Router();
var sqlQuery = require('../lcMysql.js')

/* GET users listing. */
//dl=>download
router.get('/dl/:bookid',async function(req, res, next) {
    let bookid = req.params.bookid
    //通过bookid查询数据库，获取本地的文件下载路径
    let sqlStr = 'select localdownload from book where id = ?'
    let result = await sqlQuery(sqlStr, [bookid])
    let localPath = result[0].localdownload
    res.download(localPath)
});

module.exports = router;
