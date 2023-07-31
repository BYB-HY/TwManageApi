const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');

const tableName = 'reminders'; // 资产表名

// 创建提醒
router.post('/reminder/create', async (req, res) => {
  // const { title, expiry_date, recurring, recurring_type, recurring_value } = req.body;
  const result = await handleDB(res, tableName, 'ensert', 'reminders创建失败', req.body);
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
    data: result,
  });
});

// 获取提醒列表
router.get('/reminder/list', async (req, res) => {
  const { page, pageSize } = req.query;
  //按条件查询数据
  const result = await handleDB(res, tableName, 'find', 'reminders数据库查询出错',);
  //返回对应页的数据
  const reminders = result.slice((page - 1) * pageSize, page * pageSize);
  //总数
  const total = result.length
  // res.status(200).json(reminders);
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data: reminders,
    total,
  });
});

//首页展示提醒
router.get('/Reminder/index', async (req, res) => {
  //前端判断有循环则显示重置和关闭按钮，没循环则只显示关闭
  const methodName = 'sql'; // 更新操作方法名
  const data = 'id,title,expiry_date,descr,recurring';//获取到期时间及标题和备注，是否循环

  //一个月内到期的数据，当前时间加一个月
  const currentDate = new Date();// 获取当前时间
  currentDate.setMonth(currentDate.getMonth() + 1);// 增加一个月

  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const targetTime = `${year}-${month}-${day}`;// 创建格式为YYYY-MM-DD的时间字符串

  //按小于一个月后的时间条件查询数据
  const result = await handleDB(res, tableName, methodName, '数据库查询出错', `select ${data} from ${tableName} WHERE expiry_date < "${targetTime}" order by expiry_date desc`);
  res.send({
    code: 200,
    success: true,
    message: "请求成功",
    data: result,
  })
});


//重置到期时间（按现在设置自动更新到期时间）
router.get('/Reminder/reset', async (req, res) => {

});


//需要再加一个值是否开启这个提醒

//首页获取一个月内到期提醒，先获取到期时间，减去现在时间小于30就返回给前端展示，并把计算结果一起返回，前端获取到到期时间和计算结果，如果小于0则展示已过期几天，小于30展示还有几天到期，到期时间为

//循环的，先判断是否循环，当点击重置（不点击），先判断是每多少天循环一次，还是每个月几号提醒，如果是按天把设置的循环值加到现在的到期时间里，如果是按日，就判断月份在月份加一，按年就在年份上加

//编辑提醒
router.put('/reminder/edit/:id', async (req, res) => {
  const value = req.body
  alter(req,res,value)
});
//开启关闭提醒
router.put('/reminder/enabled/:id', (req, res) => {
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
router.delete('/reminders/delete/:id', async (req, res) => {
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