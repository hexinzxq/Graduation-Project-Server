var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/bs', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

// 创建数据库组织结构Schema
var Schema = mongoose.Schema

// 创建活动数据信息结构
let activitySchma = new Schema({
    // 活动标题
    activityTitle: {
        required: true,
        type: String,
    },
    // 活动发起人
    activityLaunchedBy: {
        required: true,
        type: String,
    },
    // 活动描述
    activityDesc: {
        required: true,
        type: String,
    },
    // 活动标识id
    activityId: {
        required: true,
        type: String,
    }
  })

  // 向外暴露出该活动数据关系结构
module.exports = mongoose.model('Activity', activitySchma)