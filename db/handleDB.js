//封装数据库操作方法
const db = require('./nodejs-orm/index');

async function handleDB(res,tabelName,methodName,errmsg,n1,n2){
    let Model= db.model(tabelName);
    let result;
    try {
        result = await new Promise((resolve, reject) => {
            if (!n1) {
                //没有传参数
                Model[methodName]((err,data)=>{
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(data)
                }) 
                return
            }
            if (!n2) {
                //传n1参数
                Model[methodName](n1,(err,data)=>{
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(data)
                }) 
                return
            }
            //传两个参数
            Model[methodName](n1,n2,(err,data) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data)
            }) 
        })
    } catch (err) {
        res.send({
            errmsg
        })
        return
    }
    return result
}

module.exports = handleDB





// const express = require('express');
// const db = require('./db/nodejs-orm/index');
// const app = express();
// app.get('/get_data',(req,res)=>{
//     async function getData(){
//         let result = await new Promise((resolve,reject) => {})
//     }
//     let Model= db.model('Model');

//     //查询所有
//     Model.find((err,data)=>{
//         res.send(data)
//     })
//     //查询指定字段
//     Model.find(['name','age'],(err,data)=>{
//         res.send(data)
//     })
//     //按条件查询
//     Model.find('id=4',(err,data)=>{
//         res.send(data)
//     })
//     //分页查询
//     Model.limit({where:'age>18', number:1, conunt:5},(err,data)=>{
//         res.send(data);
//     })
//     //添加单条
//     Model.insert({name:'124',age:'48'},(err,result)=>{
//         res.send(result);
//     })
//     //添加多条，利用数组
//     Model.insert([{name:'124',age:'48'},{name:'4555',age:'30'}],(err,result)=>{
//         res.send(result);
//     })
//     //物理删除
//     Model.delete('id=15',(err,result) => {
//         res.send('删除成功');
//     })
//     //修改全部数据
//     Model.update({height:180},(err,result) => {
//         res.send('修改成功');
//     })
//     //按条件修改
//     Model.update('id=4',{height:180},(err,result) => {
//         res.send('修改成功');
//     })
// })

