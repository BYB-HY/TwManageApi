// routes/index.js
const express = require('express');
const passportRoutes = require('./passport');
const employeeRoutes = require('./employee');
const departmentsRouter = require('./departments');
const assetsRouter = require('./assets');
const performanceRouter = require('./performance');
const reimbursementsRouter = require('./reimbursements');
const remindersRouter = require('./reminders');
const menusRouter = require('./menus');
const roleTablesRouter = require('./roleTables');
const usersRouter = require('./users');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models')

const User_role_table = db.user_role_table;

router.use('/login', passportRoutes);
router.use('/employees', authenticateToken, employeeRoutes);
router.use('/assets', authenticateToken,assetsRouter);
router.use('/performance', authenticateToken,performanceRouter);
router.use('/reimbursements', authenticateToken,reimbursementsRouter);
router.use('/department', authenticateToken,departmentsRouter);
router.use('/reminder', authenticateToken,remindersRouter);
router.use('/menu',authenticateToken,menusRouter);
router.use('/role', authenticateToken,roleTablesRouter);
router.use('/user', authenticateToken,usersRouter);


function authenticateToken(req, res, next) {
    const token = req.headers.token;
    if (token == null) {
        return res.status(401).json({ message: '未提供身份验证令牌' });
    }

    jwt.verify(token, 'secret', async (err, user) => {
        if (err) {
            return res.status(403).json({ message: '身份验证令牌无效' });
        }
        // 获取当前用户的id
        const id = user.userId
        // 获取当前用户的角色id
        const { dataValues: { rid } } = await User_role_table.findOne({
            attributes: ['rid'],
            where: { uid: id },
        })
        req.user = {...user,rid}
       
        next();
    });
}

module.exports = router;

//77，点赞取消业务逻辑，17分钟


//82，密码修改业务逻辑只有4步 83的  8:32有代码

//83修改图片26分钟  安装multer

//84七牛云存图片，免费有时间限制  22分钟

//密码加密，防护设置
//详细了解req和res，开始前端的渲染，包4年，中考，嵌套邮箱,req和res的属性和方法,hash路由问题刷新报404
//多次重复请求会报错Cannot enqueue Handshake after already enqueuing a Handshake