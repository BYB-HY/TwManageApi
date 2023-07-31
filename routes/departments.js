const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const tableName = 'department'; // 部门表名

// 获取部门列表接口
router.get('/department', async (req, res) => {
    try {
        const methodName = 'find'; // 查询操作方法名
        // 调用封装的数据库操作函数查询部门列表
        const departments = await handleDB(res, tableName, methodName, '获取部门列表失败');

        res.send({
            code: 100,
            success: true,
            message: '添加成功',
            data: departments
        });
    } catch (error) {
        console.error(error);
        res.send('获取部门列表失败');
    }
});

// 部门编辑接口
router.post('/department/:id', async (req, res) => {
    try {
        const methodName = 'update'; // 更新操作方法名
        const departmentId = req.params.id; // 获取要编辑的部门id
        const newDepartmentData = req.body; // 获取请求中的新部门数据

        //需要先查询数据库是否找到这个ID，不然不可以继续操作

        // 更新部门数据
        const result = await handleDB(res, tableName, methodName, '部门编辑操作失败',  `department_id=${departmentId}` , newDepartmentData);
        res.send('部门编辑成功');
    } catch (error) {
        console.error(error);
        res.send('部门编辑操作失败');
    }
});

// 部门增加接口
router.post('/department', async (req, res) => {
    try {
        const methodName = 'ensert'; // 插入操作方法名
        const newDepartmentData = req.body; // 获取请求中的新部门数据

        // 插入新的部门数据
        const result = await handleDB(res, tableName, methodName, '部门增加操作失败', newDepartmentData);

        res.send('部门增加成功');
    } catch (error) {
        console.error(error);
        res.send('部门增加操作失败');
    }
});

// 部门删除接口
router.delete('/department/:id', async (req, res) => {
    try {
        const methodName = 'delete'; // 删除操作方法名
        const departmentId = req.params.id; // 获取要删除的部门id

        // 删除部门
        const result = await handleDB(res, tableName, methodName, '部门删除操作失败',  `department_id=${departmentId}` );

        res.send('部门删除成功');
    } catch (error) {
        console.error(error);
        res.send('部门删除操作失败');
    }
});

module.exports = router;