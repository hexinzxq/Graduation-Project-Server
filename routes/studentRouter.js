// 学生查看自己学籍情况的接口
const express = require('express')

//引入学生数据库模块
const Student = require('../models/student')

//创建一个学生信息路由
const stuInfoRouter = express.Router()

// 当请求/stuInfo的时候提供学生的学籍信息
stuInfoRouter.get('/stuInfo',function(req,res){
    res.send('访问到了该学生的学籍信息1')
})

// 向外暴露出这个路由
module.exports = stuInfoRouter