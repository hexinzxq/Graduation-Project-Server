var express = require('express');
var Admin = require('../models/admin');
var Student = require('../models/student');

// 创建一个登录相关的路由
var LoginRouter = express.Router();

LoginRouter.post('/login', async function(req,res){
    var body = req.body
    let admin = await Admin.findOne({loginName : body.loginName , loginPassword : body.loginPassword})
    let student = await Student.findOne({stuIdentifyNum : body.loginName , stuPassword : body.loginPassword})
    // console.log(admin);
    // console.log(student);
    if(admin){
        req.session.admin = admin
        return res.status(200).json({
            err_code : 200,
            role : admin,
            message : 'adjakshbbasfkasbfka'
        })
    }
    else if(student){
        req.session.student = student
        return res.status(200).json({
            err_code : 200,
            role : student,
            message : 'djfhkahfkhiwhhhf'
        })
    }
    else{
        return res.status(200).json({
            err_code : 500,
            message : 'loginName or loginPassword invalid'
        })
        
    }
    // 数据库查询是否存在该用户，存在则登录成功，不存在则登录失败
//     Admin.findOne({
//         loginName : body.loginName,
//         loginPassword : body.loginPassword
//     },function(err,admin){
//         if(err){
//             return res.status(500).json({
//                 err_code : 500,
//                 message : err.message
//             })
//         }
//         if(!admin){
//             return res.status(200).json({
//                 err_code:1,
//                 message : 'adminName or adminPassword is invalid'
//             })
//         }
//         req.session.admin = admin;
//         return res.status(200).json({
//             err_code:0,
//             message:'Login Success',
//             role : admin
//         })
//     })
})

// 向外暴露这个路由
module.exports = LoginRouter