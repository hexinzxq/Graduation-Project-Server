const express = require('express');
// 学生成绩表信息的路由模块
const StuPoint = require('../models/stuPoint');
const StuPointExcelFirst = require('../models/stuPointExcel/stuPointExcelFirst')
const StuPointExcelSecond = require('../models/stuPointExcel/stuPointExcelSecond')
const stuPointExcelThird = require('../models/stuPointExcel/stuPointExcelThird')
const stuPointExcelFourth = require('../models/stuPointExcel/stuPointExcelFourth')

// 学生成绩表信息路由创建
var stuPointInfoRouter = express.Router()

// 获取第一学年的学生成绩信息
stuPointInfoRouter.get('/graduate-project/getFirstPoint', (req, res) => {
    // console.log(req.query.stuEnrollmentNumber);
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        stuPointRange: 1
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

// 获取第二学年的学生成绩信息
stuPointInfoRouter.get('/graduate-project/getSecondPoint', (req, res) => {
    // console.log(req.query.stuEnrollmentNumber);
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        stuPointRange: 2
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

// 获取第三学年的学生成绩信息
stuPointInfoRouter.get('/graduate-project/getThirdPoint', (req, res) => {
    // console.log(req.query.stuEnrollmentNumber);
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        stuPointRange: 3
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

// 获取第四学年的学生成绩信息
stuPointInfoRouter.get('/graduate-project/getFourthPoint', (req, res) => {
    // console.log(req.query.stuEnrollmentNumber);
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        stuPointRange: 4
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

// 获取所有的当前学生成绩信息
stuPointInfoRouter.get('/graduate-project/getAllPoint', (req, res) => {
    // console.log(req.query.stuEnrollmentNumber);
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

// 查询对应学生信息接口根据学籍号
stuPointInfoRouter.post('/graduate-project/searchStuPointByStuEnroll', (req, res) => {
    const stuEnrollmentNumber = req.body.stuEnrollmentNumber
    console.log(stuEnrollmentNumber);
    StuPoint.find({
        stuEnrollmentNumber: stuEnrollmentNumber
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            console.log(data);
            res.status(200).json({
                status: 200,
                message: "success",
                result: data
            })
        }
    })
})

//将导入的excel表添加到成绩表中
stuPointInfoRouter.post('/graduate-project/importExcel', (req, res) => {
    // console.log(req.body);
    StuPoint.collection.insertMany(req.body).then(() => {
        return res.status(200).json({
            status: 200,
            // 返回学生的数据对象
            message: '获取最新的学生成绩成功',
            result: [],
            success: true
        })
    }).catch((err) => {
        return res.status(500).json({
            status: 500,
            message: err
        })
    })
})


// 暴露出该路由
module.exports = stuPointInfoRouter