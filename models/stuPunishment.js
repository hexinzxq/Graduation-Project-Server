var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建学生学籍受罚记录表
let stuPunishmentSchma = new Schema({
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
    // 处罚发起人
    punishmentByPerson: {
        required: true,
        type: String
    },
    // 惩罚名称
    punishmentName: {
        required: true,
        type: String
    },
    //惩罚类型
    punishmentType: {
        required: true,
        type: String
    },
    // 惩罚描述
    punishmentDesc: {
        type: String,
        default: '无'
    },
    // 获罚时间
    punishmentTime: {
        type: Date,
        required: true
    },
    // 惩罚时长(单位:年)
    punishmentTimeLong: {
        type: String,
        required: true
    },
    // 销罚时间
    punishmentFinish: {
        required: true,
        type: Date
    },
})

// //测试能否添加处罚信息成功
// var stuPub = mongoose.model('stupunishment', stuPunishmentSchma)
// var stuPub1 = new stuPub({
//     stuEnrollmentNumber : "L5118262200311230091",
//     stuName:"哆啦A梦",
//     punishmentByPerson:"橘子汁儿",
//     punishmentName:"观察整改",
//     punishmentType:"校级处罚",
//     punishmentDesc:"行为对学校产生影响，望改正",
//     punishmentTime:2021-10-13,
//     punishmentTimeLong:"1年",
//     punishmentFinish:2022-10-13
// })
// stuPub1.save(function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('成功存入数据库');
//     }
// })

// 向外暴露出该学生数据关系结构
module.exports = mongoose.model('stuPunishment', stuPunishmentSchma)