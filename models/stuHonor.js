var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建学生学籍荣誉信息记录表
let stuHonorSchma = new Schema({
    // 学生学籍号
    stuEnrollmentNumber: {
        required: true,
        type: String,
    },
    // 学生姓名
    stuName: {
        required: true,
        type: String
    },
    // 荣誉名称
    honorName: {
        required: true,
        type: String
    },
    //荣誉类型
    honorType: {
        required: true,
        type: String
    },
    // 荣誉描述
    honorDesc: {
        type: String,
        default: '无'
    },
    // 获得荣誉时间
    honorTime: {
        type: Date,
        required: true
    },
})

//测试能否添加荣誉信息成功
// var stuHonor = mongoose.model('StudenthonorExcel', stuHonorSchma)
// var stuHonor1 = new stuHonor({
//     stuEnrollmentNumber : "L5118262200311230091",
//     stuName:"哆啦A梦",
//     honorName:"校园AI大赛一等奖",
//     honorType:"校级",
//     honorDesc:"AI大赛推陈出新，获得一等奖",
//     honorTime:2021-7-13,
// })
// stuHonor1.save(function(err){
//     if(err){
//         console.log('error');
//     }else{
//         console.log('成功存入数据库');
//     }
// })

// 向外暴露出该学生数据关系结构
module.exports = mongoose.model('StudentHonorExcel', stuHonorSchma)