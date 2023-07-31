const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');

const tableName = 'assets'; // 资产表名

// 获取资产列表接口
router.get('/assets', async (req, res) => {
        const methodName = 'find'; // 查询操作方法名
        const {page,pageSize} = req.query;
        // 调用封装的数据库操作函数查询资产列表
        const result = await handleDB(res, tableName, methodName, '获取资产列表失败');
        const assets = result.slice((page - 1) * pageSize, page * pageSize);
        const total = result.length
        res.send({ 
            code:200,
            success:true,
            message:"请求成功",
            data:assets,
            total
        });
});
//资产信息编辑
router.post('/assets/:id', async (req, res) => {
    const assetId = req.params.id;
    const updatedAssetData = req.body;

    try {
        // 调用封装的函数，更新资产信息
        const updatedAsset = await handleDB(res, tableName, 'update', '更新资产信息失败', `asset_id = ${assetId}`, updatedAssetData);
        if (!updatedAsset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 获取职员名下资产接口
router.get('/employees/:id/assets', async (req, res) => {
    try {
        const methodName = 'find'; // 查询操作方法名
        const employeeId = req.params.id; // 获取职员id

        // 根据职员id查询职员名下资产
        const assets = await handleDB(res, tableName, methodName, '获取职员名下资产失败', `employee_id = ${employeeId}`);
        res.send(assets);
    } catch (error) {
        console.error(error);
        res.send('获取职员名下资产失败');
    }
});

// 添加资产接口
router.post('/assets_in', async (req, res) => {
    const assetData = req.body;
    //要判断有没有这个人的ID，没有就返回请输入正确的使用人

        // 调用封装的函数，插入新资产数据
        const ensertedAsset = await handleDB(res, tableName, 'ensert', '添加资产失败', assetData);
        res.send({ 
            code:200,
            success:true,
            message:"添加成功",
            data:ensertedAsset,
        });
});

// 删除资产接口
router.delete('/assets/:id', async (req, res) => {
    const assetId = req.params.id;
    try {
        // 调用封装的数据库操作函数查询资产
        const asset = await handleDB(res, tableName, 'find', '查询资产失败',`asset_id = ${assetId}`);
        if (asset.length == 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        // 调用封装的函数，删除指定资产
        const deletedAsset = await handleDB(res, tableName, 'delete', '删除资产失败', `asset_id = ${assetId}`);
        res.json(deletedAsset);
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
