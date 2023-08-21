var DataTypes = require("sequelize").DataTypes;
var _assets = require("./assets");
var _department = require("./department");
var _employee = require("./employee");
var _employee_assets = require("./employee_assets");
var _financial_reimbursement = require("./financial_reimbursement");
var _menus = require("./menus");
var _performance_all = require("./performance_all");
var _performance_assessment = require("./performance_assessment");
var _performance_extra = require("./performance_extra");
var _performance_indicators = require("./performance_indicators");
var _performance_summary = require("./performance_summary");
var _permissions = require("./permissions");
var _reminders = require("./reminders");
var _role_permissions = require("./role_permissions");
var _role_table = require("./role_table");
var _user = require("./user");
var _user_role_table = require("./user_role_table");
var _year_quarter = require("./year_quarter");

function initModels(sequelize) {
  var assets = _assets(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employee_assets = _employee_assets(sequelize, DataTypes);
  var financial_reimbursement = _financial_reimbursement(sequelize, DataTypes);
  var menus = _menus(sequelize, DataTypes);
  var performance_all = _performance_all(sequelize, DataTypes);
  var performance_assessment = _performance_assessment(sequelize, DataTypes);
  var performance_extra = _performance_extra(sequelize, DataTypes);
  var performance_indicators = _performance_indicators(sequelize, DataTypes);
  var performance_summary = _performance_summary(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var reminders = _reminders(sequelize, DataTypes);
  var role_permissions = _role_permissions(sequelize, DataTypes);
  var role_table = _role_table(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_role_table = _user_role_table(sequelize, DataTypes);
  var year_quarter = _year_quarter(sequelize, DataTypes);

  assets.belongsToMany(employee, { as: 'employee_id_employees', through: employee_assets, foreignKey: "asset_id", otherKey: "employee_id" });
  employee.belongsToMany(assets, { as: 'asset_id_assets', through: employee_assets, foreignKey: "employee_id", otherKey: "asset_id" });
  employee_assets.belongsTo(assets, { as: "asset", foreignKey: "asset_id"});
  assets.hasMany(employee_assets, { as: "employee_assets", foreignKey: "asset_id"});
  employee.belongsTo(department, { as: "department", foreignKey: "department_id"});
  department.hasMany(employee, { as: "employees", foreignKey: "department_id"});
  assets.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  employee.hasMany(assets, { as: "assets", foreignKey: "employee_id"});
  employee_assets.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  employee.hasMany(employee_assets, { as: "employee_assets", foreignKey: "employee_id"});
  user_role_table.belongsTo(role_table, { as: "rid_role_table", foreignKey: "rid"});
  role_table.hasMany(user_role_table, { as: "user_role_tables", foreignKey: "rid"});
  user_role_table.belongsTo(user, { as: "uid_user", foreignKey: "uid"});
  user.hasMany(user_role_table, { as: "user_role_tables", foreignKey: "uid"});

  return {
    assets,
    department,
    employee,
    employee_assets,
    financial_reimbursement,
    menus,
    performance_all,
    performance_assessment,
    performance_extra,
    performance_indicators,
    performance_summary,
    permissions,
    reminders,
    role_permissions,
    role_table,
    user,
    user_role_table,
    year_quarter,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
