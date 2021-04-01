var express = require('express');
// 学生学籍的数据库模块
var Student = require('../models/student');

// 学生学籍信息路由创建
var SchoolRollRouter = express.Router()

// 提供所有的学生学籍信息的接口
SchoolRollRouter.get('/graduate-project/stuInfo',function(req,res){
    // console.log(res.status(500));
    // res.send("111111111111学生信息数据")
    Student.find((err,data) => {
        // console.log(data);
        if(err){
            console.log("不存在这个数据");
            return res.status(500).json({
                status: 500,
                message: '500 ERR!'
            })
        }
        else if(res){
            return res.status(200).json({
                status: 200,
                // 返回学生的数据对象
                result: data
            })
        }
    })
    
})

//删除学生学籍信息的接口
SchoolRollRouter.get('/graduate-project/deleteStuInfo', function(req,res) {
    Student.deleteOne(req.body,(err,data) => {
        if(err){
            res.status(500).json({
                status:500,
                message:'服务器错误'
            })
        }
        return res.status(200).json({
            status:200,
            message:'删除成功',
            result: data
        })
    })   
})

//新增学生学籍接口
SchoolRollRouter.post('/graduate-project/addStuInfo',function(req,res){
    Student.insertOne(req.body,(err,data) => {
        if(err){
            res.status(500).json({
                status:500,
                message:"服务器错误"
            })
        }
        res.status(200).json({
            status:200,
            message:"学籍信息添加成功",
        })
    })
})

// 编辑学生学籍接口
SchoolRollRouter.post('/graduate-project/editStuInfo', function(req,res){
    res.send('这里是编辑学生的接口')
    Student.updateOne(req.body, (err,data) => {
        if(err){
            res.status(500).json({
                status:500,
                message:"服务器错误"
            })
        }
        res.status(200).json({
            status:200,
            message:"学籍信息已经成功更新",
        })
    })
})

// 暴露出该路由
module.exports = SchoolRollRouter