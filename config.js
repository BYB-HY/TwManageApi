const express = require('express');
const path= require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const passportRouter = require('./routes/passport');
const employeeRouter = require('./routes/employee');
const departmentsRouter = require('./routes/departments');
const assetsRouter = require('./routes/assets');
const performanceRouter = require('./routes/performance');
const reimbursementsRouter = require('./routes/reimbursements');
const remindersRouter = require('./routes/reminders');
const menusRouter = require('./routes/menus');
// let appConfig = (app) => {
//     //cookie的注册
//     app.use(cookieParser());
//     //session的注册
//     app.use(cookieSession({
//         name: 'my_session',
//         keys: ['fdhfg#2hjuhj^ffjdfjnjn'],
//         maxAge: 1000*60*60*24*2  //设置过期时间为2天
//     }));

//     //获取psot请求参数的配置
//     app.use(bodyParser.urlencoded({extended:false}));
//     app.use(bodyParser.json());

//     //使用静态资源
//     app.use(express.static(path.join(__dirname,'public')));

//     //使用静态资源模板
//     app.engine('html', require('express-art-template'));
//     app.set('view options', {
//         debug: process.env.NODE_ENV !== 'production'
//     });
//     app.set('views', path.join(__dirname, 'views'));
//     app.set('view engine', 'html');
// }


class AppConfig{
    constructor(app) {
        this.app = app;
        //cookie的注册
        this.app.use(cookieParser());
        //session的注册
        this.app.use(cookieSession({
            name: 'my_session',
            keys: ['fdhfg#2hjuhj^ffjdfjnjn'],
            maxAge: 1000*60*60*24*2  //设置过期时间为2天
        }));

        //获取psot请求参数的配置
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());
        
        //设置路由
        this.app.use(indexRouter);
        this.app.use(passportRouter);
        this.app.use(employeeRouter);
        this.app.use(assetsRouter);
        this.app.use(performanceRouter);
        this.app.use(reimbursementsRouter);
        this.app.use(departmentsRouter);
        this.app.use(remindersRouter);
        this.app.use(menusRouter);
        
        //使用静态资源
        this.app.use(express.static(path.join(__dirname,'public')));

        //使用静态资源模板
        this.app.engine('html', require('express-art-template'));
        this.app.set('view options', {
            debug: process.env.NODE_ENV !== 'production'
        });
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'html');
    }
}

module.exports = AppConfig;