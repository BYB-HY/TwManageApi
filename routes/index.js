const express = require('express');
const router = express.Router();
const handleDB= require('../db/handleDB');
//详细了解req和res，开始前端的渲染，包4年，中考，嵌套邮箱,req和res的属性和方法,hash路由问题刷新报404
//多次重复请求会报错Cannot enqueue Handshake after already enqueuing a Handshake

//测试数据库
router.get('/employee_list', (req,res) => {
    (async function() {
        let result = await handleDB(res,'employee','find','数据查询出错');
        res.send(result);
    })()
})
router.post('/employee_list', (req,res) => {
    // req.on('data',(postdata)=>{
    //     let a = postdata.toString();
    //     console.log(a)
    // })
    console.log(req.body)
})


//部门管理
//列表编辑删除增加

//资产列表接口

//资产归属属接口

//67详情页接口
//69详情页内容接口，评论数字增加接口

//72收藏功能操作数据库部分

//74评论和回复20分钟到76节


//77，点赞取消业务逻辑，17分钟 


//82，密码修改业务逻辑只有4步 83的  8:32有代码

//83修改图片26分钟  安装multer

//84七牛云存图片，免费有时间限制  22分钟

//密码加密，防护设置
module.exports = router;




// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reminder App</title>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
// </head>
// <body>
//   <div id="app">
//     <div class="container mt-5">
//       <h1 class="mb-4">Reminder App</h1>
//       <form @submit="addReminder">
//         <div class="form-group">
//           <label for="title">Title</label>
//           <input type="text" class="form-control" id="title" v-model="newReminder.title" required>
//         </div>
//         <div class="form-group">
//           <label for="expiry_date">Expiry Date</label>
//           <input type="date" class="form-control" id="expiry_date" v-model="newReminder.expiry_date" required>
//         </div>
//         <div class="form-group">
//           <label for="recurring">Recurring</label>
//           <input type="checkbox" id="recurring" v-model="newReminder.recurring">
//         </div>
//         <div v-if="newReminder.recurring">
//           <div class="form-group">
//             <label for="recurring_type">Recurring Type</label>
//             <select class="form-control" id="recurring_type" v-model="newReminder.recurring_type">
//               <option value="day">Day(s)</option>
//               <option value="week">Week(s)</option>
//               <option value="month">Month(s)</option>
//               <option value="year">Year(s)</option>
//             </select>
//           </div>
//           <div class="form-group">
//             <label for="recurring_value">Recurring Value</label>
//             <input type="number" class="form-control" id="recurring_value" v-model="newReminder.recurring_value">
//           </div>
//         </div>
//         <button type="submit" class="btn btn-primary">Add Reminder</button>
//       </form>

//       <h2 class="mt-4">Reminders</h2>
//       <ul class="list-group mt-2">
//         <li class="list-group-item" v-for="(reminder, index) in reminders" :key="index">
//           {{ reminder.title }} - {{ reminder.expiry_date }}
//           <button class="btn btn-sm btn-danger float-right" @click="deleteReminder(reminder.id)">Delete</button>
//         </li>
//       </ul>
//     </div>
//   </div>

//   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
//   <script src="app.js"></script>
// </body>
// </html>



// // app.js
// new Vue({
//     el: '#app',
//     data: {
//       newReminder: {
//         title: '',
//         expiry_date: '',
//         recurring: false,
//         recurring_type: 'day',
//         recurring_value: 1
//       },
//       reminders: []
//     },
//     methods: {
//       addReminder() {
//         // Make an API request to add the reminder
//         // You can use Axios or fetch to send the API request
  
//         // After successful API response, push the reminder to the list
//         this.reminders.push({
//           id: Math.random().toString(36).substr(2, 9), // Generate a random ID
//           title: this.newReminder.title,
//           expiry_date: this.newReminder.expiry_date,
//           recurring: this.newReminder.recurring,
//           recurring_type: this.newReminder.recurring_type,
//           recurring_value: this.newReminder.recurring_value
//         });
  
//         // Reset the form
//         this.newReminder.title = '';
//         this.newReminder.expiry_date = '';
//         this.newReminder.recurring = false;
//         this.newReminder.recurring_type = 'day';
//         this.newReminder.recurring_value = 1;
//       },
//       deleteReminder(id) {
//         // Make an API request to delete the reminder
//         // You can use Axios or fetch to send the API request
  
//         // After successful API response, remove the reminder from the list
//         this.reminders = this.reminders.filter(reminder => reminder.id !== id);
//       }
//     }
//   });
  
  
//   // app.js
//   new Vue({
//     el: '#app',
//     data: {
//       newReminder: {
//         title: '',
//         expiry_date: '',
//         recurring: false,
//         recurring_type: 'day',
//         recurring_value: 1
//       },
//       reminders: []
//     },
//     methods: {
//       addReminder() {
//         axios.post('/api/reminders', {
//           title: this.newReminder.title,
//           expiry_date: this.newReminder.expiry_date,
//           recurring: this.newReminder.recurring,
//           recurring_type: this.newReminder.recurring_type,
//           recurring_value: this.newReminder.recurring_value
//         })
//         .then(response => {
//           // After successful API response, push the reminder to the list
//           this.reminders.push(response.data);
          
//           // Reset the form
//           this.newReminder.title = '';
//           this.newReminder.expiry_date = '';
//           this.newReminder.recurring = false;
//           this.newReminder.recurring_type = 'day';
//           this.newReminder.recurring_value = 1;
//         })
//         .catch(error => {
//           console.log(error);
//         });
//       },
//       deleteReminder(id) {
//         axios.delete(`/api/reminders/${id}`)
//         .then(response => {
//           // After successful API response, remove the reminder from the list
//           this.reminders = this.reminders.filter(reminder => reminder.id !== id);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//       },
//       fetchReminders() {
//         axios.get('/api/reminders')
//         .then(response => {
//           this.reminders = response.data;
//         })
//         .catch(error => {
//           console.log(error);
//         });
//       }
//     },
//     mounted() {
//       this.fetchReminders();
//     }
//   });