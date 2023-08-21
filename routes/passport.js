const Captcha = require('../utils/captcha/index');

// routes/auth.js
const express = require('express');
// 需要安装npm install jsonwebtoken bcrypt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models')

const User = db.user;

router.post('/', async (req, res) => {
  const { username, password } = req.body;
    //   //生成hash加密字段
    // bcrypt.hash(password, 10, async(err, hash) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    //     await User.update({ password:hash }, {
    //         where: {
    //             account: username
    //         }
    //       });
    // })


    //1、获取post请求参数(用户名和密码)，判空
    if(!username || !password){
        res.status(401).json({message:'缺少参数'})
        return
    }
    // 查找用户
    const user = await User.findOne({ where: { account: username } });
    if (!user) {
      return res.status(401).json({ message: '未找到用户' });
    }
    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: '密码错误' });
    }
    
    // 颁发 JWT
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

    res.json({
        code: 200,
        success: true,
        message: "请求成功",
        token,
    })

});
















router.get('/passport/get_code/:float', (req,res) => {
    //生成验证码接口
    let captchaObj = new Captcha;
    let captcha = captchaObj.getCode();

    //将验证码文本信息存到session
    req.session['IMG_CODE']=captcha.text

    //验证码的图片信息
    //配合img标签的src属性请求来展示验证码图片的时候，需要设置响应头
    res.setHeader('Content-Type','image/svg+xml');
    res.send(captcha.data);
})


//注册接口改为新增
router.post('/passport/register',(req,res) => {
    req.on('data',(postdata)=>{
        (async function(){

            let {username,image_code,password,agree} = JSON.parse(postdata.toString());

            //1、获取post请求参数，判空
            if(!username || !image_code || !password || !agree){
                res.send({errmsg:'缺少参数'})
                return
            }
            
            //2、验证图片验证码是否正确，如果不正确就直接return.
            if(image_code.toLowerCase() !== req.session['IMG_CODE'].toLowerCase()){
                res.send({errmsg:'验证码错误'})
                return
            }
            //3、查询数据库，看用户名是否被注册了
            let result = await handleDB(res, 'info_user', 'find', 'info_user数据库查询出错',`username="${username}"`);
            //4、如果已经存在了，返回用户名已经被注册了，并且进行return
            //查询到了，result->数组[{字段...}]
            //没有查询到，result->空数组[]
            if (result.length>0){
                res.send({errmsg:'用户名已经被注册了'})
                return
            }
            //5、如果不存在，往数据库中添加一条记录
            let result2 = await handleDB(res,'info_user','insertObj','数据库插入出错',{username,nick_name:username,password_hash:password})
            //6、保持登录状态
            req.session['user_id']=result2.insertId;
            //7、返回响应成功 
            res.send({errno:'0',errmsg:'注册成功'});
        })()
    })
})


//登录接口
router.post('/passport/login',(req,res) => {
    req.on('data',(postdata)=>{
        (async function(){
            let {username,password} = JSON.parse(postdata.toString());

            //1、获取post请求参数(用户名和密码)，判空
            if(!username || !password){
                res.send({errmsg:'缺少参数'})
                return
            }
            //2、查询数据库，判断用户名是否已注册
            let result = await handleDB(res, 'info_user', 'find', 'info_user查询出错', `username="${username}"`)
            //查询到了，result->数组[{字段...}]
            //没有查询到，result->空数组[]
            //3、如果没有注册，返回用户名未被注册，并且return
            if(!result.length){
                res.send({errmsg:'用户名未被注册'});
                return
            }
            //4、如果注册了，校验密码是否正确，如果不正确就return
            if(password !== result[0].password_hash){
                res.send({errmsg:'用户名或密码不正确，请输入正确的用户名和密码'})
                return
            }
            //5、保持用户登录状态
            req.session['user_id']=result[0].id;
            //6、返回登录成功
            res.send({errno:'0',errmsg:'登录成功'})
        })()
        //命名函数写法
        // let login = async function(){
        //     let {username,password} = JSON.parse(postdata.toString());
        //     if(!username || !password){
        //         res.send({errmsg:'缺少参数'})
        //         return
        //     };
        //     let result = await handleDB(res, 'info_user', 'find', 'info_user查询出错', `username="${username}"`);
        //     if(!result.length){
        //         res.send({errmsg:'用户名未被注册'});
        //         return
        //     };
        //     if(password !== result[0].password_hash){
        //         res.send({errmsg:'用户名或密码不正确，请输入正确的用户名和密码'})
        //         return
        //     };
        //     req.session['user_id']=result[0].id;
        //     res.send({errno:'0',errmsg:'登录成功'});
        // }
        // login()
    })
})
module.exports = router;