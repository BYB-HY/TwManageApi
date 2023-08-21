const express = require('express');
const router = express.Router();
const db = require('../models')
const checkPermission = require('../utils/permission/checkPermission')

const Employee = db.employee;

/**
 * 角色id：admin/23；user/21
 */

// 获取职员列表接口
router.post('/list',checkPermission([23]), async (req, res) => {
    //获取参数，cid(部门id)，page(当前页数)，per_page(每页条数)
    const { page, per_page } = req.body;
    const data = await Employee.findAndCountAll({
        offset: (page - 1) * per_page,
        limit: per_page
    })
    res.json({
        code: 200,
        success: true,
        message: "请求成功",
        data
    })
});


//职员入职
router.post('/entry',checkPermission([23]), async (req, res) => {
    const data = req.body
    console.log(data)
    const result = await Employee.create({ data })
    // console.log(await db.employee.findAll())
    // const result = await handleDB(res, tableName, 'ensert', '数据查询出错', data);
    res.send({
        code: 100,
        success: true,
        message: '添加成功'
    });
});

// 职员编辑接口
router.post('/employee/:id',checkPermission([23]), async (req, res) => {
    // const methodName = 'update'; // 更新操作方法名
    const employee_id = req.params.id; // 获取要编辑的职员id
    const newEmployeeData = req.body; // 获取请求中的新职员数据
    //前端也要做一个判断，部门id不能为空，这里看看能不能数据库给默认值就不用判断了
    if (newEmployeeData.department_id == null) {
        newEmployeeData.department_id = 1
    }
    // const {name} = req.body;
    // 更新职员数据
    const result = await Employee.update({ newEmployeeData }, { where: { employee_id } });
    // const result = await handleDB(res, tableName, methodName, '职员编辑操作失败', `employee_id=${employeeId}`, newEmployeeData);
    res.send({
        code: 200,
        success: true,
        message: '职员编辑成功'
    });
});

// 职员离职接口
router.put('/:id/dimission',checkPermission([23]), async (req, res) => {
    // const methodName = 'update'; // 更新操作方法名
    const employee_id = req.params.id; // 获取要离职的职员id
    const notWork_date = req.body.notWork_date || new Date(); // 当前日期默认作为离职日期,这里默认日期要进一步优化，不然默认格式和数据库设计的格式不一样
    const result = await Employee.update({ work_state: "离职", notWork_date }, { where: { employee_id } });
    console.log(req.body.id, req.params.id)
    // 更新职员的离职日期
    // const result = await handleDB(res, tableName, methodName, '职员离职操作失败', `employee_id=${employeeId}`, { work_state: "离职", notWork_date: notWork_date });
    res.send({
        code: 100,
        success: true,
        message: '职员离职成功'
    });

});


//搜索功能可否封装
// 职员列表搜索接口
//测试不成功，以后再处理，看看能不能弄个通用的搜索接口,及封装数据库搜索操作功能
router.get('/search',checkPermission([23]), async (req, res) => {
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
router.post('/address_book',checkPermission([23,21]), async (req, res) => {
    const data = ['employee_id', 'name', 'email', 'department_id', 'landline_phone', 'mobile_phone', 'QQ'];//需要获取的信息
    //获取参数，cid(部门id)，page(当前页数)，per_page(每页条数)
    const { page, per_page } = req.body;
    //按条件查询数据
    const result = await Employee.findAndCountAll({
        attributes: data,
        where: { work_state: "在职" },
        offset: (page - 1) * per_page,
        limit: per_page
    })


    //按条件查询数据
    // const result = await handleDB(res, tableName, methodName, 'employee数据库查询出错', `select ${data} from employee WHERE work_state = "在职" order by department_id desc`);
    //返回对应页的数据
    // const resultPage = result.slice((page - 1) * per_page, page * per_page);
    // //总数
    // const total = result.length
    res.send({
        code: 200,
        success: true,
        message: "请求成功",
        data: result
    })
})

module.exports = router;


