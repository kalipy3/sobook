let express = require("express")
let app = express()
let sqlQuery = require("./lcMysql")

app.get('/',async (req,res)=>{
    //数据库book表里前28的book获取出来
    let strSql = "select id,bookname,bookimg,author,cataory from book limit 0,28";
    let result = await sqlQuery(strSql)
    //console.log(Array.from(result))
    //let resJson = JSON.stringify(Array.from(result))
    //res.send(resJson)
    res.json(Array.from(result))

})
app.get('/xiaoshuowenxue',async (req,res)=>{
    let strSql = "select id,bookname,bookimg,author,cataory from book where cataory = '小说文学' limit 0,28"
    let result = await sqlQuery(strSql);
    res.json(Array.from(result))
})
app.get('/books/:bookid.html',async (req,res)=>{
    let strSql = "select * from book where id = ?";
    let bookid = req.params.bookid;
    let result = await sqlQuery(strSql,[bookid])
    res.json(Array.from(result))
    
})

module.exports = app;