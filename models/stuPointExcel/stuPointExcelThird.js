var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建学生学籍成绩记录表
let stuPointExcelThirdSchma = new Schema({
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
    // 成绩区间
    stuPointRange: {
        required: true,
        type: Number,
        enum: [1,2,3,4],
        default: 3,
    },
    // 科目名称
    stuSubjectName: {
        type: String,
        required: true,
    },
    // 学分
    stuCredit: {
        type: String,
        required: true
    },
    // 学分绩点
    stuGpa: {
        type: String,
        required: true
    },
    // 科目成绩
    stuGrade: {
        type: String,
        required: true
    }
})

//测试能否添加第三学年学生成绩信息成功
// var stuPoint = mongoose.model('stuPointExcelThird', stuPointExcelThirdSchma)
// var stuPoint1 = new stuPoint({
//     stuEnrollmentNumber : "L5118262200311230091",
//     stuName:"琴琴子",
//     stuPointRange:3,
//     stuSubjectName:"《高等数学（一）》",
//     stuCredit:"5.0",
//     stuGpa:"2.9",
//     stuGrade:"75.00",
// })
// stuPoint1.save(function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('成功存入数据库');
//     }
// })


// 向外暴露出该学生成绩数据关系结构
module.exports = mongoose.model('stuPointExcelThird', stuPointExcelThirdSchma)