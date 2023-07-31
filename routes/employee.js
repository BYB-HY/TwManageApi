const express = require('express');
const router = express.Router();
const handleDB= require('../db/handleDB');

const tableName = 'employee';

// 获取职员列表接口
router.post('/employees_list', async (req, res) => {
    try {
        //获取参数，cid(部门id)，page(当前页数)，per_page(每页条数)
        const  {page,cid,per_page} = req.body;
        //查询数据库职员表中数据，根据以上给三个参数，获取前端需要的数据
        //where 展示全部的数据
        const wh = cid ? `department_id= ${cid} AND` : ''
        console.log(wh)
        //查询到对应条件的所有数据
        const result = await handleDB(res, tableName,'limit','employee数据库查询出错',{where: `${wh} work_state = "在职"`,number:page,count:per_page})
        //返回对应页的数据
        const resultPage = result.slice((page - 1) * per_page, page * per_page);
        //所有职员数据,！！！这里要算在职的
        const resultAll = await handleDB(res,tableName,'find','数据查询出错','work_state = "在职"');
        //总数
        const total = resultAll.length
        //总页数=总数/每一页的条数，取整，向上Math.ceil
        // const totalPage = Math.ceil(total/per_page)

        res.send({ 
            code:200,
            success:true,
            message:"请求成功",
            data:resultPage,
            total
        })
    } catch (error) {
        console.error(error);
        res.send('获取职员列表失败');
    }
});


//职员入职
router.post('/employees_entry', async (req,res) => {
        const data = req.body
        const result = await handleDB(res,tableName,'ensert','数据查询出错', data);
        res.send({
            code:100,
            success:true,
            message:'添加成功'
        });
})

// 职员编辑接口
router.post('/employees/:id', async (req, res) => {
    try {
        const methodName = 'update'; // 更新操作方法名
        const employeeId = req.params.id; // 获取要编辑的职员id
        const newEmployeeData = req.body; // 获取请求中的新职员数据
        //前端也要做一个判断，部门id不能为空，这里看看能不能数据库给默认值就不用判断了
        if(newEmployeeData.department_id == null ) {
            newEmployeeData.department_id = 1
        }
        // const {name} = req.body;
        // 更新职员数据
        const result = await handleDB(res, tableName, methodName, '职员编辑操作失败',  `employee_id=${employeeId}` , newEmployeeData);
        res.send({
            code:100,
            success:true,
            message:'职员编辑成功'
        });
    } catch (error) {
        console.error(error);
        res.send('职员编辑操作失败');
    }
    });
    
// 职员离职接口
router.put('/employees/:id/dimission', async (req, res) => {
    try {
        const methodName = 'update'; // 更新操作方法名
        const employeeId = req.params.id; // 获取要离职的职员id
        const notWork_date = req.body.notWork_date || new Date(); // 当前日期默认作为离职日期,这里默认日期要进一步优化，不然默认格式和数据库设计的格式不一样
        console.log(req.body.id,req.params.id)
        // 更新职员的离职日期
        const result = await handleDB(res, tableName, methodName, '职员离职操作失败', `employee_id=${employeeId}`, { work_state: "离职",notWork_date: notWork_date });
        res.send({
            code:100,
            success:true,
            message:'职员离职成功'
        });
    } catch (error) {
        console.error(error);
        res.send('职员离职操作失败');
    }
    });


//搜索功能可否封装
// 职员列表搜索接口
//测试不成功，以后再处理，看看能不能弄个通用的搜索接口,及封装数据库搜索操作功能
router.get('/employees/search', async (req, res) => {
try {
    const methodName = 'find'; // 查询操作方法名
    const searchQuery = req.query.q; // 获取搜索关键字

    // 根据搜索关键字查询职员列表
    const result = await handleDB(
    res,
    tableName,
    methodName,
    '职员列表搜索操作失败',
    { $or: [` name: { $regex: ${searchQuery}, $options: 'i' } }, { department: { $regex: ${searchQuery}, $options: 'i' } `] }
    );
    //它使用 $or 运算符指定了一个或多个匹配条件。在这个例子中，我们使用 $regex 和 $options 来进行模糊搜索，并指定了两个匹配条件：根据名字 (name 字段) 或部门 (department 字段) 进行搜索。
    res.send(result);
} catch (error) {
    console.error(error);
    res.send('职员列表搜索操作失败');
}
});

//通讯录接口
router.post('/address_book', async (req,res) => {
    const methodName = 'sql'; // 更新操作方法名

    const data = 'employee_id,name,email,department_id,landline_phone,mobile_phone,QQ';//需要获取的信息

    //获取参数，cid(部门id)，page(当前页数)，per_page(每页条数)
    const  {page,per_page} = req.body;

    //按条件查询数据
    const result=await handleDB(res, tableName,methodName,'employee数据库查询出错',`select ${data} from employee WHERE work_state = "在职" order by department_id desc`);
    //返回对应页的数据
    const resultPage = result.slice((page - 1) * per_page, page * per_page);
    //总数
    const total = result.length
        res.send({ 
            code:200,
            success:true,
            message:"请求成功",
            data:resultPage,
            total
        })
})

module.exports = router;