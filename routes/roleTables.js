const express = require('express');
const router = express.Router();
const checkPermission = require('../utils/permission/checkPermission')
const db = require('../models');

const { role_table, role_permissions, permissions } = db;


role_table.belongsToMany(permissions, {
    through: role_permissions,
    foreignKey: 'rid',
    otherKey: 'pid',
});



/**
   * 获取角色列表和权限列表
   */
router.get('/get_role_permissions_list',checkPermission([23]), async (req, res) => {
    const dataPermissions = await permissions.findAll();
    const dataRole = await role_table.findAll({
        include: {
            model: permissions,
            through: {
                model: role_permissions,
            },
        },
    });
    res.send({
        code: 200,
        success: true,
        message: "获取成功",
        dataRole,
        dataPermissions
    });

});

/**
   * 插入角色信息
   * @param {Object} param {角色名}
   * @returns
   */
router.post('/insert_role_info',checkPermission([23]), async (req, res) => {
    const { role_type, pidAdd } = req.body;
    if (!role_type) {
        res.send({
            success: false,
            errorMessage: "创建角色失败（请求参数缺失）",
        });
        return;
    }
    // 校验角色是否存在
    const count = await role_table.count({
        where: { role_type },
    });
    if (count > 0) {
        res.send({
            success: false,
            errorMessage: "角色已存在",
        });
        return;
    }
    // 创建角色
    const newRole = await role_table.create({role_type});
    // 添加权限
    const pid = !pidAdd ? 37 : pidAdd;//默认给基础权限
    const rid = newRole.id  //新创建的角色ID
    await role_permissions.create({ pid, rid });//角色添加权限
    res.send({
        code: 200,
        success: true,
        message: "添加成功",
    });
})


/**
   * 获取角色权限列表
   * @param {Object} param {roleId：角色id}
   */
router.get('/get_rolePermissions',checkPermission([23]), async (req, res) => {
    const { roleId } = req.query;
    // 获取当前角色权限
    
    const data = await role_table.findAll({
        include: {
            model: permissions,
            through: {
                attributes: [],
            },
        },
        where: {
            id: roleId,
        },
    });
    res.send({
        code: 200,
        success: true,
        message: "获取成功",
        data
    });
})


/**
 * 编辑角色
 * @param {Object} param {checked：[true(添加权限),false(删除权限)]，pid：权限id，rid：角色id}
 */

router.post('/edit_role',checkPermission([23]), async (req, res) => {
    //判断是删除还是编辑，编辑就删除，但是要看看有没有绑定外键
    //如果是编辑就获取所有信息信息，



    const { checked, pid, rid } = req.body;
    if (!checked) {
        await role_permissions.update({ pid },{ where: { rid }});
    } else {
        await role_permissions.destroy({ where: { pid, rid } });
    }
    res.send({
        code: 200,
        success: true,
        message: "操作成功",
    });
})



module.exports = router;