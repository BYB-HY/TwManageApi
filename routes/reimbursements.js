const express = require('express');
const router = express.Router();
const handleDB= require('../db/handleDB');

// 新增报销申请接口
router.post('/reimbursements', async (req, res) => {
    try {
      const tableName = 'reimbursements'; // 报销申请表名
      const methodName = 'insert'; // 插入操作方法名
      const newReimbursementData = req.body; // 获取请求中的新报销申请数据
  
      // 插入新的报销申请数据
      const result = await handleDB(res, tableName, methodName, '新增报销申请操作失败', newReimbursementData);
  
      res.send('新增报销申请成功');
    } catch (error) {
      console.error(error);
      res.send('新增报销申请操作失败');
    }
  });
  
// 查询报销申请列表接口
router.get('/reimbursements', async (req, res) => {
try {
    const tableName = 'reimbursements'; // 报销申请表名
    const methodName = 'find'; // 查询操作方法名

    // 调用封装的数据库操作函数查询报销申请列表
    const reimbursements = await handleDB(res, tableName, methodName, '获取报销申请列表失败');

    res.send(reimbursements);
} catch (error) {
    console.error(error);
    res.send('获取报销申请列表失败');
}
});

// 查询单个报销申请接口
router.get('/reimbursements/:id', async (req, res) => {
try {
    const tableName = 'reimbursements'; // 报销申请表名
    const methodName = 'findOne'; // 查询单个记录操作方法名
    const reimbursementId = req.params.id; // 获取报销申请id

    // 根据报销申请id查询单个报销申请
    const reimbursement = await handleDB(res, tableName, methodName, '获取报销申请失败', reimbursementId);

    res.send(reimbursement);
} catch (error) {
    console.error(error);
    res.send('获取报销申请失败');
}
});

// 更新报销申请接口
router.put('/reimbursements/:id', async (req, res) => {
try {
    const tableName = 'reimbursements'; // 报销申请表名
    const methodName = 'update'; // 更新操作方法名
    const reimbursementId = req.params.id; // 获取要编辑的报销申请id
    const newReimbursementData = req.body; // 获取请求中的新报销申请数据

    // 更新报销申请数据
    const result = await handleDB(res, tableName, methodName, '更新报销申请失败', { id: reimbursementId }, newReimbursementData);

    res.send('更新报销申请成功');
} catch (error) {
    console.error(error);
    res.send('更新报销申请失败');
}
});

// 删除报销申请接口
router.delete('/reimbursements/:id', async (req, res) => {
try {
    const tableName = 'reimbursements'; // 报销申请表名
    const methodName = 'delete'; // 删除操作方法名
    const reimbursementId = req.params.id; // 获取要删除的报销申请id

    // 删除报销申请
    const result = await handleDB(res, tableName, methodName, '删除报销申请失败', { id: reimbursementId });

    res.send('删除报销申请成功');
} catch (error) {
    console.error(error);
    res.send('删除报销申请失败');
}
});

module.exports = router;