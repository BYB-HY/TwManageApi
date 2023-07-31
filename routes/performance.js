const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');

const tableName_year = 'year_quarter';//年-季度
const tableName_employee = 'employee';//绩效考核人员
const tableName_summary = 'performance_summary';//全员年度汇总表
const tableName_indicators = 'performance_indicators'//考核指标和各项占比信息
const tableName_extra = 'performance_extra'//加减分项目信息
const tableName_assessment = 'performance_assessment'//个人绩效考核
const tableName_all = 'performance_all' //全员季度绩效考核统计表


//获取绩效汇总接口
router.get('/performance-summary/:year', async (req, res) => {
  //前端传年份（默认今年，前端处理）
  const { year = new Date().getFullYear() } = req.query;
  //查询季度表所有年份,并去重
  const resultYear = await handleDB(res, tableName_year, 'find', 'reminders数据库查询出错',['year']);
  const allYear = [...new Set(resultYear.map(obj => obj.year))];
  //如果没有这个年份
  if (allYear.filter(item => (item === year)).length == 0) {
    //在季度表中创建
    // const column = '(year, quarter)';
    // const vaule = `(${year},'第一季度'),(${year},'第二季度'),(${year},'第三季度'),(${year},'第四季度')`;
    // await handleDB(res, tableName_year, 'sql', 'reminders数据库查询出错', `INSERT INTO ${tableName_year} ${column} VALUES ${vaule}`);
    //拿考核人员管理表（值为在职,并且值是需要评绩效的）的id
    const employeeId =  await handleDB(res, tableName_employee, 'sql', 'reminders数据库查询出错', `select employee_id from ${tableName_employee} where work_state = "在职" AND performance = 1`);
    //在汇总表中创建
    const value = employeeId.map(obj => `(${obj.employee_id},2023)`);
    const column = '(employee_id,year)'
    console.log(value)
    // const value = 
    await handleDB(res, tableName_summary, 'sql', 'reminders数据库查询出错', `INSERT INTO ${tableName_summary} ${column} VALUES ${value}`);
    // await handleDB(res, tableName_summary, 'ensert', 'reminders数据库查询出错', [{employee_id, year}]);
  }
  //用年份的变量获取到汇总表的对应数据
  const result = await handleDB(res, tableName_summary, 'find', 'reminders数据库查询出错', `year=${year}`);
  //获取4个季度id
  const allQuarter = await handleDB(res, tableName_year, 'find', 'reminders数据库查询出错', `year=${year}`);
  //最后返回所有年份和汇总表的数据
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data: [result , allYear, allQuarter],
  });
});
// app.get('/api/performance-summary', (req, res) => {
//   const { year = new Date().getFullYear() } = req.query;
//   const years = [...new Set(quarters.map(q => q.year))];

//   if (!years.includes(parseInt(year))) {
//     // 如果年份不存在，则创建对应年份的记录
//     const newQuarters = [1, 2, 3, 4].map(q => {
//       const newQuarter = { id: `q${q}id`, year: parseInt(year) };
//       quarters.push(newQuarter);
//       return newQuarter;
//     });

// 在考核人员管理表中创建与新季度记录相关的记录（假设值为在职）
// perform the required operations
// 获取对应年份的4个季度id
//   const quarterIds = quarters.filter(q => q.year === parseInt(year)).map(q => q.id);

//   // 根据季度id获取汇总表中的数据
//   const summaryData = {};
//   quarterIds.forEach(quarterId => {
//     summaryData[quarterId] = performanceSummary[quarterId] || [];
//   });

//   res.json({ years, summary: summaryData });
// });




//获取员工绩效接口
//前端传员工id和季度id
router.get('/gerenjixio', async (res, req) => {
  const { yuangonid, jiduid } = req.params;
  //在个人考核表和指标表中查对应的数据
  const result = await handleDB(res, tableName_assessment, 'find', 'reminders数据库查询出错', yuangonid, jiduid);
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data: result,
  });
})

//新填写个人绩效接口
router.post('/gerenjixio', async (res, req) => {
  //前端传员工id和季度id，添加的数据
  const { yuangonid, jiduid, jiduname, data } = req.params;
  const {project, indicators} = data;
  const pingjun = '';//默认平均值为空
  //执行修改项目和指标的语句，并且运算，然后三元运算判断是不是第四季度id,真查询汇总表获取4个值，运算4个季度平均值，修改汇总的平均值（可以封装），把运算结果填入汇总和季度汇总
  const { id } = await handleDB(res, tableName_indicators, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data);//添加指标，并获取指标id
  const result = await handleDB(res, tableName_assessment, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data);//添加个人考核表,这里需要上传多个项目
  if (jiduname == '第四季度') {
    //获取年份，查该员工对应的3个值
    //用3个值和上面的值取平均
    const result3 = await handleDB(res, tableName_summary, 'find', 'reminders数据库查询出错', yuangonid);
    pingjun = '平均值'
  }
  const result2 = await handleDB(res, tableName_summary, 'ensert', 'reminders数据库查询出错', {yuangonid, jiduid, 计算结果 ,pingjun});//该员工结果填入汇总
})




//需要修改汇总和季度汇总的数据
router.post('/gerenjixio1', async (res, req) => {
  //前端传员工id和季度id，添加的数据
  const { yuangonid, jiduid, jiduname, data } = req.params;
  const {project, indicators} = data;
  //判断填了指标和项目
  if (i && b) {
    const pingjun = '';//默认平均值为空
    //执行修改项目和指标的语句，并且运算，然后三元运算判断是不是第四季度id,真查询汇总表获取4个值，运算4个季度平均值，修改汇总的平均值（可以封装），把运算结果填入汇总和季度汇总
    const { id } = await handleDB(res, tableName_indicators, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data);//添加指标，并获取指标id
    const result = await handleDB(res, tableName_assessment, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data);//添加个人考核表
    //total_completion_amount：总完成金额  bid_assistance_quantity：协助投标   profit_margin：利润率
//indicator  指标    ratio占比
//各完成情况= 各项目总完成金额相加（或各项目利润率相加/各项目协助投标相加）/指标  系数=完成情况*占比   各系数累计=各系数相加    总得分=各系数累计+加分项+减分项
//除了计算平均数其它由前端计算
    const 计算结果 = a;
    const result2 = await handleDB(res, performance_all, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, 计算结果);//该员工该季度结果填入季度汇总
    if (jiduname == '第四季度') {
      //获取年份，查该员工对应的3个值
      //用3个值和上面的值取平均
      const result3 = await handleDB(res, tableName_summary, 'find', 'reminders数据库查询出错', yuangonid);
      return pingjun = '平均值'
    }
    //把上面的值加入汇总表对应的季度
    const result4 = await handleDB(res, tableName_summary, 'update', 'reminders数据库查询出错', yuangonid, 对应季度, 计算结果, pingjun);
  } else if (i) { //填了指标
    const pingjun = '';//默认平均值为空
    //执行修改指标的语句，并且运算，然后三元运算判断是不是第四季度id,真查询汇总表获取4个值，运算4个季度平均值，把运算结果填入汇总和季度汇总
    const { id } = await handleDB(res, tableName_indicators, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data);//添加指标，并获取指标id
    if (jiduname == '第四季度') {
      //获取年份，查该员工对应的3个值
      //用3个值和上面的值取平均
      const result3 = await handleDB(res, tableName_summary, 'find', 'reminders数据库查询出错', yuangonid);
      return pingjun = '平均值'
    }
    //把上面的值加入汇总表对应的季度
    const result4 = await handleDB(res, tableName_summary, 'update', 'reminders数据库查询出错', yuangonid, 对应季度, 计算结果, pingjun);
  } else if (b) { //填了项目
    //真，执行修改项目的语句
    const result = await handleDB(res, tableName_assessment, 'ensert', 'reminders数据库查询出错', yuangonid, jiduid, data, id);//添加个人考核表
  } 
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data: result,
  });
})


//编辑员工绩效接口
//需要修改汇总和绩效汇总的数据，（前端先判断有没数据修改，没的话不触发）
//前端传员工id和季度id，修改的数据
//判断改了指标和项目
//真，执行修改项目和指标的语句，并且运算，把运算结果改入汇总和季度汇总
//执行判断汇总有没有4个值的函数
//判断改了项目
//真，执行修改项目并且运算，把运算结果改入汇总和季度汇总
//执行判断汇总有没有4个值的函数
//判断改了指标
//真，执行修改指标的语句，并且运算，把运算结果改入汇总和季度汇总
//执行判断汇总有没有4个值的函数

//封装判断汇总有没有4个值的函数
//真查询汇总表获取4个值，运算4个季度平均值，修改汇总的平均值（可以封装）





//获取季度绩效汇总接口
router.get('/jidujixio', async (res, req) => {
  const { jiduid } = req.params;
  //在个人考核表和指标表中查对应的数据
  const result = await handleDB(res, tableName_all, 'find', 'reminders数据库查询出错', yuangonid, jiduid);
  res.send({
    code: 200,
    success: true,
    message: "获取成功",
    data: result,
  });
})

//获取年度4个季度id的封装函数
async function jiduid(a) {
  //a是年份
  const result = await handleDB(res, year_quarter, 'find', 'reminders数据库查询出错', a);
  return result.id
}


// 获取员工绩效列表接口
router.get('/performance', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'find'; // 查询操作方法名

  // 调用封装的数据库操作函数查询绩效列表
  const performanceList = await handleDB(res, tableName, methodName, '获取绩效列表失败');

  res.send(performanceList);
});

// 获取单个员工绩效接口
router.get('/performance/:id', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'findOne'; // 查询单个记录操作方法名
  const performanceId = req.params.id; // 获取绩效id

  // 根据绩效id查询单个员工绩效
  const performance = await handleDB(res, tableName, methodName, '获取员工绩效失败', performanceId);

  res.send(performance);
});

// 创建员工绩效接口
router.post('/performance', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'insert'; // 插入操作方法名
  const newPerformanceData = req.body; // 获取请求中的新员工绩效数据

  // 插入新的员工绩效数据
  const result = await handleDB(res, tableName, methodName, '创建员工绩效失败', newPerformanceData);

  res.send('创建员工绩效成功');
});

// 更新员工绩效接口
router.put('/performance/:id', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'update'; // 更新操作方法名
  const performanceId = req.params.id; // 获取要编辑的绩效id
  const newPerformanceData = req.body; // 获取请求中的新员工绩效数据

  // 更新员工绩效数据
  const result = await handleDB(res, tableName, methodName, '更新员工绩效失败', { id: performanceId }, newPerformanceData);

  res.send('更新员工绩效成功');
});

// 删除员工绩效接口
router.delete('/performance/:id', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'delete'; // 删除操作方法名
  const performanceId = req.params.id; // 获取要删除的绩效id

  // 删除员工绩效
  const result = await handleDB(res, tableName, methodName, '删除员工绩效失败', { id: performanceId });

  res.send('删除员工绩效成功');
});



// 获取员工绩效列表接口
router.get('/performance', async (req, res) => {
  const tableName = 'performance'; // 绩效管理表名
  const methodName = 'findAll'; // 查询所有记录操作方法名

  // 调用封装的数据库操作函数查询绩效列表
  const performanceList = await handleDB(res, tableName, methodName, '获取绩效列表失败');

  // 按月份进行汇总
  const summarizedPerformance = summarizePerformanceByMonth(performanceList);

  res.send(summarizedPerformance);
});

// 辅助函数，将员工绩效按月份汇总
function summarizePerformanceByMonth(performanceList) {
  // 创建一个对象来保存汇总数据，键是月份，值是该月份的绩效列表
  const summarizedPerformance = {};

  // 遍历员工绩效列表
  performanceList.forEach(performance => {
    const month = getMonthFromPerformance(performance); // 获取该绩效记录的月份

    // 如果该月份的绩效还没有被记录过，就创建一个空数组来存储绩效记录
    if (!summarizedPerformance[month]) {
      summarizedPerformance[month] = [];
    }

    // 将绩效记录添加到对应月份的绩效列表中
    summarizedPerformance[month].push(performance);
  });

  return summarizedPerformance;
}

// 辅助函数，从员工绩效获取月份
function getMonthFromPerformance(performance) {
  // 这里可以根据实际的数据结构和需求来提取月份
  // 假设绩效记录有一个名为"date"的属性表示日期，日期格式为"YYYY-MM-DD"
  // 我们从日期中提取年份和月份作为标识
  const date = new Date(performance.date); // 假设"date"是绩效记录的日期属性
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份，注意月份从0开始计数，因此要加1

  return `${year}-${month}`;
}

module.exports = router;
// 其他接口定义...

// 启动服务器


// 在上面的代码中，我们对`/performance`接口进行了修改。首先获取所有员工的绩效记录，然后通过`summarizePerformanceByMonth`函数将绩效按照月份进行汇总。该函数会将绩效记录按照月份的格式保存到`summarizedPerformance`对象中，并返回该对象作为响应结果。

// 注意，`summarizePerformanceByMonth`函数是一个辅助函数，通过调用`getMonthFromPerformance`函数从每条绩效记录中提取月份信息。这里我们假设绩效记录有一个名为"date"的属性表示日期，我们从该属性中提取出年份和月份，并将其作为键来存储对应月份的绩效记录。

// 希望这对你有帮助！如果还有其他问题，请随时提问。



