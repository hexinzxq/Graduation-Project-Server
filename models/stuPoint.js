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
let stuPointSchma = new Schema({
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
    // 成绩区间（1代表第一学年，以此类推4年制）
    stuPointRange: {
        required: true,
        type: Number,
        enum: [1,2,3,4],
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

//测试能否添加学生成绩信息成功
// var stuPoint = mongoose.model('stuPointExcel', stuPointSchma)
// var stuPoint1 = new stuPoint({
//     stuEnrollmentNumber : "L5118262200311230091",
//     stuName:"哆啦A梦",
//     stuPointRange:4,
//     stuSubjectName:"《程序员的社会修养》",
//     stuCredit:"5.0",
//     stuGpa:"2.8",
//     stuGrade:"78.00",
// })
// stuPoint1.save(function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('成功存入数据库');
//     }
// })

// 向外暴露出该学生成绩数据关系结构
module.exports = mongoose.model('stuPointExcel', stuPointSchma)