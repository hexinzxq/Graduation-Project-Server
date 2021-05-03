const express = require('express');
// 学生学籍的数据库模块
const Student = require('../models/student');

const StudentHonorExcel = require('../models/stuHonor')

const StuErrReportExcel = require('../models/stuErrReport')

// 学生学籍信息路由创建
var SchoolRollRouter = express.Router()

// 提供所有的学生学籍信息的接口
SchoolRollRouter.get('/graduate-project/stuInfo', async function (req, res) {
    // console.log(res.status(500));
    // res.send("111111111111学生信息数据")
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    let total = 0
    // console.log(Student);
    await Student.countDocuments().then(data => {
        total = data
    })
    await Student.find((err, data) => {
        if (err) {
            console.log("不存在这个数据");
            return res.status(500).json({
                status: 500,
                message: '500 ERR!'
            })
        } else if (res) {
            return res.status(200).json({
                status: 200,
                // 返回学生的数据对象
                message: '获取最新的学生学籍信息成功',
                result: data,
                total: total
            })
        }
    }).skip((Number(pagenum) - 1) * Number(pagesize)).limit(Number(pagesize))
})

//删除学生学籍信息的接口
SchoolRollRouter.delete('/graduate-project/deleteStuInfo', function (req, res) {
    console.log(req.query);
    Student.deleteOne({
        stuEnrollmentNumber: req.query.stuEnrollmentNumber
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: '服务器错误'
            })
        }
        return res.status(200).json({
            status: 200,
            message: '删除成功',
            result: data
        })
    })
})

//新增学生学籍接口
SchoolRollRouter.post('/graduate-project/addStuInfo', function (req, res) {
    Student.insertMany(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "学籍信息添加成功",
                result: data
            })
        }
    })
})

// 编辑学生学籍接口
SchoolRollRouter.post('/graduate-project/editStuInfo', function (req, res) {
    // res.send('这里是编辑学生的接口')
    Student.findByIdAndUpdate({
        _id: req.body._id
    }, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "学籍信息已经成功更新,相关的申报错误已修改完成",
                result: data
            })
        }
    })
})

// 查询含有处罚的学生学籍信息接口根据学生姓名
SchoolRollRouter.post('/graduate-project/searchStuInfoHavePublishByName', (req, res) => {
    const stuName = req.body.stuName
    Student.find({
        stuName: stuName
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "查询到最新的含处罚信息的学生学籍信息",
                result: data,
                total: 1
            })
        }
    })
})

// 查询学生学籍信息接口根据学籍号
SchoolRollRouter.post('/graduate-project/searchStuInfoByEnrollmentNumber', async (req, res) => {
    const stuEnrollmentNumber = req.body.stuEnrollmentNumber
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    let total = 0
    await Student.countDocuments().then(data => {
        total = data
    })
    await Student.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        pagenum: pagenum,
        pagesize: pagesize
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "查询到最新的学生学籍信息",
                result: data,
                total: 1
            })
        }
    }).skip((Number(pagenum) - 1) * Number(pagesize)).limit(Number(pagesize))
})

// 根据学籍号和信息同时查询学籍数据
SchoolRollRouter.post('/graduate-project/searchStuInfo', async (req, res) => {
    const stuEnrollmentNumber = req.body.stuEnrollmentNumber
    const stuName = req.body.stuName
    await Student.find({
        stuEnrollmentNumber: stuEnrollmentNumber,
        stuName: stuName
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else if (!data) {
            res.status(200).json({
                status: 200,
                message: "学生学籍信息不存在",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "查询到最新的学生学籍信息成功",
                result: data,
                total: 1
            })
        }

    })
})

// 获取处分未销毁的学生信息
SchoolRollRouter.get('/graduate-project/getStuInfoHavePublish', async (req, res) => {
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    let total = 0
    await Student.find({
        stuPunishment: 1
    }).countDocuments().then(data => {
        total = data
    })
    let stuPunishment = req.query.stuPunishment
    await Student.find({
        stuPunishment: stuPunishment
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
            total: total
        })
    }).skip((Number(pagenum) - 1) * Number(pagesize)).limit(Number(pagesize))
})

// 撤销学生学籍处分
SchoolRollRouter.delete('/graduate-project/cancelStuPublish', async (req, res) => {
    let id = req.query.id
    await Student.deleteOne({
            _id: id
        },
        // {
        //     $set: {
        //         stuPunishment: 0
        //     }
        // },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            }
            res.status(200).json({
                result: data,
                status: 200,
                message: '成功销毁该处罚'
            })
        })
})

// 修改处分状态
SchoolRollRouter.get('/graduate-project/switchPunishStatus', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await Student.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                stuPunishment: Number(0)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 修改荣誉状态
SchoolRollRouter.get('/graduate-project/switchHornorStatus', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await Student.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                stuHonor: Number(1)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 修改受罚状态为有
SchoolRollRouter.get('/graduate-project/switchPunishToTrue', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await Student.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                stuPunishment: Number(1)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 获取所有获得荣誉的学生信息
SchoolRollRouter.get('/graduate-project/getStuInfoHaveHonor', async (req, res) => {
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    let total = 0
    await Student.find({
        stuHonor: 1
    }).countDocuments().then(data => {
        total = data
    })
    let stuHonor = req.query.stuHonor
    await Student.find({
        stuHonor: stuHonor
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        }
        res.status(200).json({
            status: 200,
            message: "获取最新版本的包含荣誉的学籍信息列表成功",
            result: data,
            total: total
        })
    }).skip((Number(pagenum) - 1) * Number(pagesize)).limit(Number(pagesize))
})

// 获取当前学生的荣誉信息
SchoolRollRouter.get('/graduate-project-punish/viewHonor', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    await StudentHonorExcel.find({
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
            message: "获取最新版本的学生荣誉信息列表成功",
            result: data,
        })
    })
})

//新增学生学籍荣誉信息接口
SchoolRollRouter.post('/graduate-project/addStuHonor', function (req, res) {
    StudentHonorExcel.insertMany(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "荣誉信息已添加成功",
                result: data
            })
        }
    })
})

// 学生学籍信息审核
SchoolRollRouter.get('/graduate-project/viewStuPersonalInfo', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    await Student.find({
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
            message: "获取审核信息成功",
            result: data,
        })
    })
})

// 存入学生错误申报信息StuErrReportExcel
SchoolRollRouter.post('/graduate-project/saveErrReport', (req, res) => {
    // console.log(req.body);
    StuErrReportExcel.insertMany(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "申报成功",
                result: data
            })
        }
    })
})

// 更改错误申报识别码为有
SchoolRollRouter.get('/graduate-project/switchErrStatus', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await Student.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                distinguishCode: Number(1)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 更改错误申报识别码为没有
SchoolRollRouter.get('/graduate-project/switchErrStatusToFalse', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await Student.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                distinguishCode: Number(0)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 修改处理状态为1.已处理
SchoolRollRouter.get('/graduate-project/switchquestionStatusToTrue', async (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    // console.log(stuEnrollmentNumber);
    await StuErrReportExcel.updateOne({
            stuEnrollmentNumber: stuEnrollmentNumber
        }, {
            $set: {
                questionStatus: Number(1)
            }
        },
        (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: '服务器出错啦！'
                })
            } else {
                res.status(200).json({
                    result: data,
                    status: 200,
                    message: 'success'
                })
            }
        })
})

// 获取所有的个人错误申报信息
SchoolRollRouter.get('/graduate-project/getErrReportsInfo', (req, res) => {
    let stuEnrollmentNumber = req.query.stuEnrollmentNumber
    StuErrReportExcel.find({
        stuEnrollmentNumber: stuEnrollmentNumber
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: '服务器出错啦！'
            })
        } else {
            res.status(200).json({
                result: data,
                status: 200,
                message: 'success'
            })
        }
    })
})

// 获取提交了审核的学生信息
SchoolRollRouter.get('/graduate-project/getStuInfoHaveErr', async (req, res) => {
    let pagenum = req.query.pagenum
    let pagesize = req.query.pagesize
    let total = 0
    await Student.find({
        distinguishCode: 1
    }).countDocuments().then(data => {
        total = data
    })
    await Student.find({
        distinguishCode: 1
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "服务器错误"
            })
        }
        res.status(200).json({
            status: 200,
            message: "获取最新版本的需要审核的学籍信息列表成功",
            result: data,
            total: total
        })
    }).skip((Number(pagenum) - 1) * Number(pagesize)).limit(Number(pagesize))
})

//将导入的excel表添加到学籍信息表中
SchoolRollRouter.post('/graduate-project/importStuInfo', (req, res) => {
    // console.log(req.body);
    Student.collection.insertMany(req.body).then(() => {
        return res.status(200).json({
            status: 200,
            // 返回学生的数据对象
            message: '获取最新的学生成绩成功',
            result: [],
            success: true
        })
    }).catch((err) => {
        return res.status(500).json({
            status: 500,
            message: err
        })
    })
})

// 学生修改登录密码
SchoolRollRouter.post('/graduate-project/modifyPassword', (req, res) => {
    let stuEnrollmentNumber = req.body.stuEnrollmentNumber
    let newPassword = req.body.stuNewPassword
    // console.log(stuEnrollmentNumber);
    // console.log(newPassword);
    Student.updateOne({
        stuEnrollmentNumber: stuEnrollmentNumber
    }, {
        $set: {
            stuPassword: newPassword
        }
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: '密码修改出了问题'
            })
        } else {
            res.status(200).json({
                result: data,
                status: 200,
                message: '修改成功，登录已失效，请重新登录'
            })
        }
    })
})

// 暴露出该路由
module.exports = SchoolRollRouter