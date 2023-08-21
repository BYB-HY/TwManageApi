const express = require('express');
const router = express.Router();
const checkPermission = require('../utils/permission/checkPermission')
const handleDB = 1;
const db = require('../models')

const Reminders = db.reminders; // 执行提醒表


// 创建提醒
router.post('/create',checkPermission([23]), async (req, res) => {
  // const { title, expiry_date, recurring, recurring_type, recurring_value } = req.body;
  const reqData = req.body
  const data = await Reminders.create({reqData})
  // const result = await handleDB(res, tableName, 'ensert', 'reminders创建失败', req.body);
  // const reminder = {
  //   id: result.insertId,
  //   title,
  //   expiry_date,
  //   recurring,
  //   recurring_type,
  //   recurring_value
  // };
  // res.status(201).json(result);
  res.send({
    code: 200,
    success: true,
    message: "添加成功",
    data
  });
});

// 获取提醒列表
router.get('/list',checkPermission([23]), async (req, res) => {
  const { page, pageSize } = req.query;
  const offset = Number((page-1)*pageSize)
    const limit = Number(pageSize)
  const data = await Reminders.findAndCountAll({ 
    offset,
    limit
  })
  // //按条件查询数据
  // const result = await handleDB(res, tableName, 'find', 'reminders数据库查询出错',);
  // //返回对应页的数据
  // const reminders = result.slice((page - 1) * pageSize, page * pageSize);
  // //总数
  // const total = result.length
  // // res.status(200).json(reminders);
  console.log(data.rows)
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data
  });
});

//首页展示提醒
router.get('/index',checkPermission([23]), async (req, res) => {
  //前端判断有循环则显示重置和关闭按钮，没循环则只显示关闭


  //获取所有提醒的列表
  const data = await Reminders.findAll();
// 获取当前时间
  const currentDate = new Date();
  //计算一个月之后的日期
  const oneMonth = new Date();
oneMonth.setMonth(currentDate.getMonth() + 1);// 增加一个月
// 提取日期部分
const year = oneMonth.getFullYear();
const month = oneMonth.getMonth() + 1; // 月份从0开始，需要加1
const day = oneMonth.getDate();

const oneMonthLater = new Date(`${year}-${month}-${day}`);
  // 筛选出在一个月内到期的对象
const result = data.filter(item => {
  if(item.dataValues.enabled){
    const expiryDate = new Date(item.dataValues.expiry_date); // 将到期日期字符串转为Date对象
    return expiryDate <= oneMonthLater;
  }
}); 
// 遍历筛选结果，计算到期天数并添加到期时间到对象中
result.forEach(item => {
  const expiryDate = new Date(item.dataValues.expiry_date); // 假设对象的到期日期是字符串格式，需先转为Date对象
  const timeRemaining = Math.abs(expiryDate - currentDate);
  
  // 将毫秒数转换为天数
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  
  item.dataValues.days_remaining = daysRemaining;
});
  res.send({
    code: 200,
    success: true,
    message: "请求成功",
    data: result,
  })
});


//重置到期时间（按现在设置自动更新到期时间）
router.get('/reset',checkPermission([23]), async (req, res) => {

});


//需要再加一个值是否开启这个提醒

//首页获取一个月内到期提醒，先获取到期时间，减去现在时间小于30就返回给前端展示，并把计算结果一起返回，前端获取到到期时间和计算结果，如果小于0则展示已过期几天，小于30展示还有几天到期，到期时间为

//循环的，先判断是否循环，当点击重置（不点击），先判断是每多少天循环一次，还是每个月几号提醒，如果是按天把设置的循环值加到现在的到期时间里，如果是按日，就判断月份在月份加一，按年就在年份上加

//编辑提醒
router.put('/edit/:id',checkPermission([23]), async (req, res) => {
  const value = req.body
  alter(req,res,value)
});
//开启关闭提醒
router.put('/enabled/:id',checkPermission([23]), (req, res) => {
  const {enabled} = req.body;
  alter(req,res,{'enabled':enabled})
});

//封装修改函数
async function alter (req,res,value){
  const { id } = req.params;
  const result = await handleDB(res, tableName, 'update', '数据库修改失败', `id=${id}`, value);
  // res.status(200).json(result);
  res.send({
    code: 200,
    success: true,
    message: "修改成功",
    data: result,
  });
}
// 删除提醒
router.delete('/delete/:id',checkPermission([23]), async (req, res) => {
  const { id } = req.params;
  await handleDB(res, tableName, 'delete', 'Data deletion error', `id=${id}`);
  // res.status(200).json({ message: 'Reminder deleted successfully' });
  res.send({
    code: 200,
    success: true,
    message: "删除成功",
  });
});


module.exports = router;