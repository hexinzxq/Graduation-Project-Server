const express = require('express');
// 学生惩罚信息的路由模块
const stuPunishmentExcel = require('../models/stuPunishment');

// 学生学籍信息路由创建
var stuPunishInfoRouter = express.Router()

// 处理预览包含处分的学生处分信息
// SchoolRollRouter.get('/graduate-project/viewPunish',(req, res) => {
//     let stuEnrollmentNumber = req.query.stuEnrollmentNumber
//     console.log(stuEnrollmentNumber);
//     console.log(stuPunishmentExcel);
//     stuPunishmentExcel.findOne({
//         stuEnrollmentNumber: stuEnrollmentNumber
//     }, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({
//                 status: 500,
//                 message: '服务器出错啦！'
//             })
//             console.log('1111');
//             res.status(200).json({
//                 status: 200,
//                 message: '获取到目前的惩罚信息',
//                 result: data
//             })
//         }
//     })
// })

stuPunishInfoRouter.get('/graduate-project-punish/viewPunish', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    await stuPunishmentExcel.find({
        stuEnrollmentNumber: stuEnrollmentNumber
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        }
        res.status(200).json({
            status: 200,
            message: "获取最新版本的受罚学籍信息列表成功",
            result: data,
        })
    })
})

//删除学生处罚信息学籍信息的接口
stuPunishInfoRouter.delete('/graduate-project-punish/deletePunish', function (req, res) {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    stuPunishmentExcel.deleteOne({
        stuEnrollmentNumber: stuEnrollmentNumber
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: '服务器错误'
            })
        }
        return res.status(200).json({
            status: 200,
            message: '删除此条惩罚信息成功',
            result: data
        })
    })
})

//新增学生学籍处罚信息接口
stuPunishInfoRouter.post('/graduate-project/addStuPunish', function (req, res) {
    stuPunishmentExcel.insertMany(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "处罚信息已添加成功",
                result: data
            })
        }
    })
})

// 暴露出该路由
module.exports = stuPunishInfoRouter