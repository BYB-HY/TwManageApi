const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');

const tableName = 'menus';

router.get('/menu', async (req, res) => {
    try {
        const methodName = 'find'; // 查询操作方法名
        const result = await handleDB(res, tableName, methodName, 'menus数据查询失败');
        // 将导航栏项组织为层级结构
        const menuList = buildHierarchy(result);
        res.status(200).json({
            code:200,
            success:true,
            message:"请求成功",
            data:menuList
        });
        // res.send(menuList)
    } catch (error) {
        console.error('错误:', error);
        res.status(500).json({ error: errorMessage });
    }
});

// 构建导航栏项的层级结构的函数
function buildHierarchy(items) {
    const hierarchy = {};

    items.forEach(item => {
        if (!item.parent_id) {
            // 如果项没有父项，它是顶级项
            hierarchy[item.id] = { ...item, children: [] };
        } else {
            // 如果项有父项，将其作为父项的子项添加进去
            if (!hierarchy[item.parent_id]) {
                hierarchy[item.parent_id] = { children: [] };
            }
            hierarchy[item.parent_id].children.push({ ...item, children: [] });
        }
    });

    return Object.values(hierarchy);
}

module.exports = router;