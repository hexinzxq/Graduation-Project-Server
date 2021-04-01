var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建学生学籍受罚记录表
let studentPublishSchma = new Schema({
    // 学生学籍号
    stuEnrollmentNumber: {
        required: true,
        type: String,
        unique: true
    },
    // 学生姓名
    stuName: {
        required: true,
        type: String
    },
    // 处罚发起人
    pulishByPerson: {
        required: true,
        type: String
    },
    // 惩罚名称
    publishName: {
        required: true,
        type: String
    },
    //惩罚类型
    publishType: {
        required: true,
        type: String
    },
    // 惩罚描述
    publishDesc: {
        type: String,
        default: '无'
    },
    // 获罚时间
    publishTime: {
        type: Date,
        required: true
    },
    // 惩罚时长(单位:年)
    publishTimeLong: {
        type: String,
        required: true
    },
    // 销罚时间
    publishFinish: {
        required: true,
        type: Date
    },
})

//测试能否添加处罚信息成功
var stuPub = mongoose.model('StudentPublishExcel', studentPublishSchma)
var stuPub1 = new stuPub({
    stuEnrollmentNumber : "L511826198711230018",
    stuName:"李四三",
    pulishByPerson:"王尼玛",
    publishName:"留校察看",
    publishType:"校级处罚",
    publishDesc:"行为极其恶劣，但考虑是初犯！",
    publishTime:2021-10-13,
    publishTimeLong:"3年",
    publishFinish:2024-10-13
})
stuPub1.save(function(err){
    if(err){
        console.log('error');
    }else{
        console.log('成功存入数据库');
    }
})

// 向外暴露出该学生数据关系结构
module.exports = mongoose.model('StudentPublishExcel', studentPublishSchma)