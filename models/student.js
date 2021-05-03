var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建大学生数据信息结构
let studentSchma = new Schema({
    // 学生头像
    stuAvatar : {
        required : true,
        type : String,
        default:'https://z3.ax1x.com/2021/05/01/gZ99Wn.jpg'
    },
    // 学生学籍号
    stuEnrollmentNumber: {
        required: true,
        type: String,
        unique : true
    },
    // 学生身份证号码
    stuIdentifyNum: {
        required: true,
        type: String,
        unique : true
    },
    // 学生姓名
    stuName: {
        required: true,
        type: String
    },
    //学生曾用名
    stuPassName: {
        type: String
    },
    // 学生性别（0表示男，1表示女）
    stuGender: {
        required: true,
        type: Number,
        enum: [0, 1],
        default: 0
    },
    // 学生年龄
    stuAge: {
        required: true,
        type: Number
    },
    // 学生户籍所在地
    stuAddress: {
        required: true,
        type: String
    },
    // 学生政治面貌(0表示社会人士，1表示为共青团员，2表示为党员)
    stuPoliticsStatus: {
        required: true,
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    //学生籍贯
    stuNativePlace: {
        required: true,
        type: String
    },
    // 学生民族
    stuNation: {
        required: true,
        type: String
    },
    // 学生联系电话
    stuPhoneNumber: {
        required: true,
        type: String
    },
    // 学生家庭住址
    stuHomeAddress: {
        required: true,
        type: String
    },
    // 学生邮编
    stuPostCode: {
        required: true,
        type: String
    },
    // 教育经历
    stuEducationExperience: {
        required: true,
        type: String
    },
    // 学生健康状况(0表示健康，-1表示不健康，1表示良好)
    stuHealth: {
        required: true,
        type: Number,
        enum: [-1, 0, 1],
        default: 0
    },
    // 学生的登录密码
    stuPassword: {
        required: true,
        type: String,
        maxlength: 15,
        minlength: 6,
        default: '123456'
    },
    // 学生荣誉(0代表没有，1代表有)
    stuHonor : {        
        required : true,
        type : Number,
        enum : [0,1],
        default : 0
    },
    // 惩罚记录（0代表没有，1代表有）
    stuPunishment : {
        required : true,
        type : Number,
        enum : [0,1],
        default : 0
    },
    // 身份id
    roleId : {
        type : Number,
        default : 0
    },
    // 错误申报识别码(0为未提交错误申报，1为提交了错误申报信息)
    distinguishCode: {
        type: Number,
        enum: [0,1],
        default: 0
    }
})

//测试能否添加学生成功
// var stu = mongoose.model('Student' , studentSchma)
// var stu1 = new stu({
//     stuAvatar:'https://z3.ax1x.com/2021/05/01/gVXtxS.jpg',
//     stuEnrollmentNumber : "L5118262200311231001",
//     stuIdentifyNum : "513127198711230786",
//     stuName : "哆啦C梦", 
//     stuPassName : "猫猫",
//     stuGender : 0,
//     stuAge : 18,
//     stuAddress : "四川省雅安市芦山县太平镇钟灵村123号",
//     stuPoliticsStatus : 1,
//     stuNativePlace : "四川·芦山",
//     stuNation : "汉族",
//     stuPhoneNumber : "17370345620",
//     stuHomeAddress : "四川省雅安市芦山县太平镇钟灵村123号",
//     stuPostCode : "657033",
//     stuEducationExperience : "2006.9-2011.6：太平小学；2011.9-2014.6：芦山县初级中学；2014.9-2017.6：天全县高级中学；2017.9-2021.6：成都大学",
//     stuHealth : 1,
//     stuPassword : "123456",
//     stuHonor : "0",
//     stuPunishment : "1",
//     distinguishCode: 0
// })
// stu1.save(function(err,ret){
//     if(err){
//         console.log('error');
//     }else{
//         console.log('成功存入数据库');
//     }
// })

// 向外暴露出该学生数据关系结构
module.exports = mongoose.model('Student', studentSchma)