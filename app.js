let express = require('express')
const path = require('path')
const fs = require('fs')
const stuInfoRouter = require('./routes/studentRouter')
const bodyParser = require('body-parser',{useNewUrlParser:true})
// 引入登录路由
const LoginRouter = require('./routes/login')
// 引入学籍路由
const SchoolRollRouter = require('./routes/schoolRollInfo')
const stuPunishInfoRouter = require('./routes/stuPunishInfo')
const stuPointInfoRouter = require('./routes/stuPointExcel')
var session = require('express-session')
var moment = require('moment');
moment().format();

const app = express()

// 配置解决跨域的问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  });

//开放公共静态资源
app.use('/punblic/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//配置中间键  --配置解析表单POST请求体插件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//配置session
app.use(session({
    secret: 'hexinItcast',
    resave: false,
    saveUninitialized: true
}))

// 挂载学生信息查看的路由
app.use(stuInfoRouter)
// 挂载登录相关的路由
app.use(LoginRouter)
// 挂载学籍信息路由
app.use(SchoolRollRouter)
app.use(stuPunishInfoRouter)
app.use(stuPointInfoRouter)

app.listen(8888,function(){
    console.log('大学生档案管理系统服务器运行中......（8888端口），测试服务器请访问127.0.0.1:8888');
})