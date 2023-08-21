const express = require('express');
const router = express.Router();
const checkPermission = require('../utils/permission/checkPermission')
const db = require('../models');

const { user, user_role_table, role_table } = db;

user.belongsToMany(role_table, {
    through: user_role_table,
    // as: 'roles',
    foreignKey: 'uid',
    otherKey: 'rid'
});

/**
 * 获取用户列表
 */
router.get('/get_users_list',checkPermission([23]), async (req, res) => {
    const { per_page, page } = req.query;
    const offset = Number(((page - 1) * per_page))
    const limit = Number(per_page)
    const data = await user.findAndCountAll({
        include: {
            model: role_table,
            attributes: ['role_type'],
            through: {
                model: user_role_table,
            },
        },
        offset,
        limit
    });
    // console.log(data.rows[0].role_tables)
    const users = data.rows;
    const totalCount = data.count;

    // 处理获取的数据
    // 你可以通过遍历 `users` 来获取每个用户的角色属性值
    users.forEach(user => {
        const roles = user.role_tables;
        roles.forEach(role => {
            // 获取属性值
            user.dataValues.role_tables = role.role_type;
        });
    });
    res.send({
        code: 200,
        success: true,
        message: "获取成功",
        data
    });
})


/**
 * 获取当前登录的用户角色
 */
router.get('/role', async (req, res) => {
    const id = req.user.rid
    //获取用户角色
    const { dataValues: { role_type } } = await role_table.findOne({
        attributes: ['role_type'],
        where: { id },
    })
    res.send({
        code: 200,
        success: true,
        message: "获取成功",
        role: role_type
    });
})



/**
   * 插入用户信息
   * @param {Object} param {账号，密码，昵称，备注，状态，权限}
   * @returns
   */
router.post('/insert_user_info',checkPermission([23]), async (req, res) => {
    const { account, password, name, memo, status, role = [] } = req.body;
    if (!account || !password || !name) {
        res.send({
            success: false,
            errorMessage: "创建用户失败（请求参数缺失）",
        });
        return;
    }
    // 校验用户是否存在
    const count = await user.count({
        where: { account },
    });
    if (count > 0) {
        res.send({
            success: false,
            errorMessage: "用户已存在",
        });
        return;
    }
    // 创建用户
    const newUser = await user.create({
        account,
        password: password,
        // password: encrypt(password)
        name,
        memo: memo || null,
        status: status ? 0 : 1,
    });
    // 添加权限
    if (role.length > 0) {
        await user_role_table.bulkCreate(
            role.map((v) => {
                return { uid: newUser.id, rid: v };
            })
        );
    }
    res.send({
        code: 200,
        success: true,
        message: "添加成功",
    });
})




/**
* 更新用户信息
* @param {Object} param {用户id，账号，密码，昵称，备注，状态，权限}
* @returns
*/
router.post('/update_user_info',checkPermission([23]), async (req, res) => {
    const { userId, account, password, name, memo, status, role = [] } = req.body;
    if (!userId || !account || !password || !name) {
        res.send({
            success: false,
            errorMessage: "创建用户失败（请求参数缺失）",
        });
        return;
    }

    // 更新用户基础数据
    await user.update(
        { name, account, password: password, memo, status: status ? 0 : 1 },
        {
            where: { id: userId },
        }
    );
    // 获取用户角色列表
    const userRole = await user_role_table.findAll({ where: { uid: userId } });
    // 变动模型
    const variation = role.map((v, i) => {
        if (!userRole[i]) {
            return { type: "create", uid: userId, rid: v }; // 未存在执行创建
        } else if (userRole[i].uid === userId && userRole[i].rid === v) {
            return { type: "skip" }; // 已存在执行跳过
        } else if (userRole[i].uid === userId && userRole[i].rid !== v) {
            return { type: "update", rid: v, id: userRole[i].id }; // 角色不同执行更新
        }
    })
        .concat(
            userRole.splice(role.length).map((v) => {
                return { type: "destroy", id: v.id };
            })
        );
    // 更新用户角色
    await Promise.all(
        variation.map((v) => {
            if (v.type === "create") {
                console.log(1)
                return user_role_table.create({ uid: v.uid, rid: v.rid });
            } else if (v.type === "skip") {
                console.log(2)
                return Promise.resolve(true);
            } else if (v.type === "update") {
                console.log(3)
                return user_role_table.update({ rid: v.rid }, { where: { id: v.id } });
            } else if (v.type === "destroy") {
                return user_role_table.destroy({ where: { id: v.id } });
            }
        })
    );
    res.send({
        code: 200,
        success: true,
        message: "更新成功",
    });
})


module.exports = router;