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
let stuErrReportSchma = new Schema({
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
    //出错模块信息
    questionModule: {
        required: true,
        type: String
    },
    // 出错模块描述
    questionDesc: {
        type: String,
        required: true
    },
    // 处理状态[0表示待处理，1表示已处理]
    questionStatus: {
        type: Number,
        required: true,
        enum:[0,1],
        default: 0
    }
})

//测试能否添加荣誉信息成功
// var stuQuestion = mongoose.model('stuErrReportExcel', stuErrReportSchma)
// var stuQuestion1 = new stuQuestion({
//     stuEnrollmentNumber : "L5118262200311230091",
//     stuName:"琴琴子",
// questionModule: "健康信息不显示",
// questionDesc: "健康信息不展示，有问题啊",
// questionStatus: 0
// })
// stuQuestion1.save(function(err){
//     if(err){
//         console.log('error');
//     }else{
//         console.log('成功存入数据库');
//     }
// })

// 向外暴露出该学生数据关系结构
module.exports = mongoose.model('StuErrReportExcel', stuErrReportSchma)