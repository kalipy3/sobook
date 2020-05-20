var express = require('express');
var path = require("path")
let sqlQuery = require("./lcMysql")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置静态目录
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',async (req,res)=>{
  let page = 1
  let sqlStr = "select id,bookname,bookimg,author,cataory from book limit ?,28"
  let arr = [(page-1)*28];
  let result = await sqlQuery(sqlStr,arr)

  //获取总页数
  let sqlStr1 = "select count(id) as num  from book"
  let result1 = await sqlQuery(sqlStr1)
  let pageAll = Math.ceil(result1[0].num/28) ;
  let cid = 0
  //设置分页的起始点
  let startPage = (page - 4)<1?1:(page-4);
  let endPage = (page+5)>pageAll?pageAll:page+5;
  let options = {
    books:Array.from(result),
    cataorys:await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }
  res.render('bookIndex.ejs',options)
})

//设置分类页面的路由
// app.get("/cataory/:cataoryid",async (req,res)=>{
//   let sqlStr = "select id,bookname,bookimg,author,cataory from book WHERE cataory in (SELECT cataory from cataory WHERE id = ?) limit 0,28"
//   let arr = [req.params.cataoryid];
//   let result = await sqlQuery(sqlStr,arr)
//   let options = {
//     books:Array.from(result),
//     cataorys:await getCataory()
//   }
//   res.render('bookIndex.ejs',options)
// })

//设置搜索的路由
app.get('/search/:searchKey/page/:pid',async (req,res)=>{
  let sqlStr = "select id,bookname,bookimg,author,cataory from book where bookname like '%"+req.params.searchKey+"%' or author like '%"+req.params.searchKey+"%' limit 0,28"
  let result = await sqlQuery(sqlStr)
  //获取总页数
  let sqlStr1 = "select count(id) as num  from book where bookname  like '%"+req.params.searchKey+"%' or author like '%"+req.params.searchKey+"%'"
  let result1 = await sqlQuery(sqlStr1)
  let pageAll = Math.ceil(result1[0].num/28) ;
  let cid = req.params.searchKey
  //设置分页的起始点
  let page = parseInt(req.params.pid)
  let startPage = (page - 4)<1?1:(page-4);
  let endPage = (page+5)>pageAll?pageAll:page+5;
  let options = {
    books:Array.from(result),
    cataorys:await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }
  res.render('searchIndex.ejs',options)
})


app.get('/books/:bookid',async (req,res)=>{
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


async function getCataory(){
  //获取所有分类
  let sqlStr = "select * from cataory";
  let result = await sqlQuery(sqlStr);
  return Array.from(result);
}




//分页页面
app.get('/c/:cid/page/:pid',async (req,res)=>{
  let page = parseInt(req.params.pid)
  let sqlStr;
  let result;
  let arr;
  let sqlStr1;
  if(req.params.cid == 0){
    sqlStr = "select id,bookname,bookimg,author,cataory from book limit ?,28"
    arr = [(page-1)*28];
    result = await sqlQuery(sqlStr,arr)
    sqlStr1 = "select count(id) as num  from book"
  }else{
    sqlStr = "select id,bookname,bookimg,author,cataory from book WHERE cataory in (SELECT cataory from cataory WHERE id = ?) limit ?,28"
    arr = [req.params.cid,(page-1)*28];
    result = await sqlQuery(sqlStr,arr)
    sqlStr1 = "select count(id) as num  from book WHERE cataory in (SELECT cataory from cataory WHERE id = ?)"
  }

  

  //获取总页数
  let result1 = await sqlQuery(sqlStr1,arr)
  let pageAll = Math.ceil(result1[0].num/28) ;
  let cid = req.params.cid
  //设置分页的起始点
  let startPage = (page - 4)<1?1:(page-4);
  let endPage = (page+5)>pageAll?pageAll:page+5;
  let options = {
    books:Array.from(result),
    cataorys:await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }
  res.render('bookIndex.ejs',options)
})

module.exports = app;
