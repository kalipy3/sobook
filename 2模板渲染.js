let express = require("express")
let app = express()
let sqlQuery = require("./lcMysql")
//使用模板来渲染页面
let ejs = require('ejs');
//将模板引擎与express应用相关联
app.set('views',"views");	//设置视图的对应目录
app.set("view engine","ejs");		//设置默认的模板引擎
app.engine('ejs', ejs.__express);		//定义模板引擎

app.get('/',async (req,res)=>{
    //插入变量
    let options = {
        title:"lcbook首页",
        articleTitle:"<h1>文章标题</h1>"
    }
    res.render('index.ejs',options)

})
app.get('/tj',async (req,res)=>{
    //条件显示
    let options = {
        "username":"小明",
        "gender":"男"
    }
    res.render('condition.ejs',options)

})    
app.get('/xh',async (req,res)=>{
    //循环
    let stars = ["牛人","郭敬明","吴亦凡","鹿晗"]
    let options = {
        stars
    }
    res.render('xh.ejs',options);
    
})

module.exports = app;