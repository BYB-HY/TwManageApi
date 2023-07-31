const mysql = require('mysql');
let orm_config = {
    host: 'localhost',//数据库地址
    port: '3306',//数据库端口
    user: 'root',//数据库登录用户名
    password: '1234',//登录密码
    database: 'manage_system',//数据库名
}
let options = {};
let tableSQL = '';
let isConnect = false;


//编辑和删除，需要先查询数据库是否找到这个ID，不然不可以继续操作



function Model(name, option) {
    this.name = name;
    this.option = option;
};

/**
 * @description: 条件查询
 * @param {object} options : { where: 查询条件, }
 * @return：
 */
Model.prototype.find = function (options, callback) {
    if (!isConnect) {
        // console.log(options.constructor);
        this.connect(err => {
            isConnect = true;
            var str = '';
            if (!callback) {
                str = `select * from ${this.name}`;
                console.log(str, 'find1')
                callback = options;
            } else if (options.constructor == Array) {
                str = `select ${options.join()} from ${this.name}`;
                console.log(str, 'find2')
            } else {
                str = `select * from ${this.name} where ${options}`;
                console.log(str, 'find3')
            };
            connection.query(str, (error, resulte, fields) => {
                callback(error, resulte, fields);
                console.log(error, 'finderror1')
            });
            return this;
        })
    } else {
        var str = '';
        if (!callback) {
            str = `select * from ${this.name}`;
            console.log(str, 'find4')
            callback = options;
        } else if (options.constructor == Array) {
            str = `select ${options.join()} from ${this.name}`;
            console.log(str, 'find5')
        } else {
            str = `select * from ${this.name} where ${options}`;
            console.log(str, 'find6')
        };
        connection.query(str, (error, results, fields) => {
            callback(error, results, fields);
            console.log(error, 'finderror2')
        });
        return this;
    }
}


/**
 * @description: 下拉加载查询
 * @param {object} options : { where: 查询条件, number: 当前页数, count: 每页数量}\
 * @return：
 */
Model.prototype.limit = function (options, callback) {
    var str = '';
    if (!options.where) {
        str = `select * from ${this.name} limit ${options.number * options.count}, ${options.count}`;
    } else {
        str = `select * from ${this.name} where ${options.where} limit ${options.number * options.count}`;
    };
    connection.query(str, (error, results, fields) => {
        callback(error, results, fields);
    });
    return this;
}

/**
 * @description: 插入数量
 * @parm {Object} obj: 对象或者数量
 * @parm {Function} callback : (req,results) =>{}
 */
Model.prototype.ensert = function (obj, callback) {
    if (!isConnect) {
        this.connect(err => {
            if (err) {
                throw err;
            } else {
                connection.query(tableSQL, (error, results, fields) => {
                    if (Array.isArray(obj)) {
                        for (let i = 0; i < obj.length; i++) {
                            this.insertObj(obj[i], callback)
                        }
                    } else {
                        this.insertObj(obj, callback)
                    }
                });
            }
        });
    } else {
        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                this.insertObj(obj[i], callback)
            }
        } else {
            this.insertObj(obj, callback)
        }
    }
}

Model.prototype.insertObj = function (obj, callback) {
    let keys = [];
    let values = '';
    for (let key in obj) {
        keys.push(key);
        values += `"${obj[key]}",`;
    };
    values = values.replace(/,$/, '');
    let str = `INSERT INTO ${this.name} (${keys.join()}) VALUES (${values})`;
    connection.query(str, (error, results, fields) => {
        console.log(str, 'insertObj2')
        callback(error, results);
        console.log(error, 'insertObj2')
    });
}

/**
 * @description: 更新数据
 * @param {object} option 可选参数  更新条件
 * @param {object} obj 修改后的数据
 * @param {Function} callback: (req,results) =>{}
 */

Model.prototype.update = function (option, obj, callback) {
    let str = '';
    if (arguments.length == 2) {
        callback = obj;
        obj = option;
        str = `UPDATE ${this.name} SET `;
        for (let key in obj) {
            str += `${key}='${obj[key]}',`;
        };
        str = str.replace(/(,)$/, '');
        console.log(str, 'update1')
    } else {
        str = `UPDATE ${this.name} SET `;
        for (var key in obj) {
            str += `${key}='${obj[key]}',`;
        };
        str = str.replace(/(,)$/, '');
        // 确保传递的 option 是一个有效的字符串
        if (typeof option === 'undefined') {
            throw new Error('Invalid option');
        }
        str += ` WHERE ${option}`;
        console.log(str, 'update2')
    }
    connection.query(str, (error, results, fields) => {
        console.log(error, 'update3');
        callback(error, results, fields);

    });
    return this;
}

/**
 * @description 删除数据
 * @param {Object} option: 可选参数 删除条件
 * @param {Function} callback : (req,result) =>{}
 */

Model.prototype.delete = function (option, callback) {
    let str = '';
    //清空
    if (!callback) {
        str = `delet from ${this.name}`;
        callback = option;
    } else {
        //条件删除
        str = `delete from ${this.name} where ${option}`;
    };
    connection.query(str, (error, results, fields) => {
        console.log(str)
        callback(error, results, fields);
        console.log(error, 'delete1')
    });
    return this;
}

/**
 * @description: 执行sql语句
 * @param {String} str: sql语句
 * @param {Function} callback : (req,result) =>{}
 */

Model.prototype.sql = function (str, callback) {
    connection.query(str, (error, results, fields) => {
        console.log(error, "sql")
        console.log(str, "sql")
        callback(error, results, fields);
    });
    return this;
}

/**
 * @description: 删除model表格（慎用！）
 * @param {type}
 * @return:
 */

Model.prototype.drop = function (callback) {
    connection.query(`DROP TABLE ${this.name}`, (error, results, fields) => {
        callback(error, results, fields);
    });
    return this;
}

//连接查询
Model.prototype.connect = function (callback) {
    let p1 = new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    p1.then(() => {
        callback(null);
    }, err => {
        if (err.sqlState == 42000) {
            createDatabase(callback);
        } else if (err.sqlState == 2000) {
            callback('数据库账号密码错误');
        } else {
            callback(err);
        }
    });
};

//创建数据库
let createDatabase = function (callback) {
    let p2 = new Promise((resolve, reject) => {
        connection = mysql.createConnection({
            host: options.host,//数据库地址
            port: options.port,//端口号
            user: options.user,//用户名，没有可不填
            password: options.password,//密码，没有可不填
        });
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    let p3 = new Promise((resolve, reject) => {
        connection.query(`CREATE DATABASE ${option.database}`, (err, results, fleds) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    let p4 = new Promise((resolve, reject) => {
        connection.query(`use ${option.deatbase}`, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    let pAll = Promise.all([p2, p3, p4]);

    pAll.then(() => {
        callback(null);
    }).catch((err) => {
        callback(err);
    });
}


let orm = {
    /**
     * @description:连接数据库
     * @param {String} host: 主机名
     * @param {Number} port: 端口号
     * @param {String} user: 用户名
     * @param {String} password: 密码
     * @param {String} databse: 数据库名
     * @return:
     */
    connect: function ({ host = 'localhost', port = 3306, user = '', password = '', database = 'news' }) {
        databaseName = database;//全局存储当前数据库名称
        options = {
            host,
            port,
            user,
            password,
            database
        };
        connection = mysql.createConnection(options);
    },
    /**
     * @description: 创建model（表格模型对象）
     * @param {script} name: 表格名称
     * @param {object} options:表格数据结构
     * @return: Model对象：负责数据库增删改查
     */
    model: function (name, options) {
        let str = 'id int primary key auto_increment,';
        for (var key in options) {
            if (options[key] == Number) {
                str += `${key} numeric,`;
            } else if (options[key] == Date) {
                str += `${key} timestamp,`;
            } else {
                str += `${key} varchar(255),`;
            }
        };
        str = str.replace(/,$/, '');
        tableSQL = `CREATETABLE ${name} (${str})`;
        return new Model(name, options);
    }
}

orm.connect(orm_config);
module.exports = orm;