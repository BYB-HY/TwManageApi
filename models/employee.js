const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "员工姓名"
    },
    gender: {
      type: DataTypes.CHAR(4),
      allowNull: true,
      comment: "性别"
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "出生日期"
    },
    card_id: {
      type: DataTypes.CHAR(18),
      allowNull: true,
      comment: "身份证号"
    },
    wedlock: {
      type: DataTypes.ENUM('已婚','未婚','离异'),
      allowNull: true,
      comment: "婚姻状况"
    },
    nation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "民族"
    },
    native_place: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "籍贯"
    },
    politic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "政治面貌"
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "邮箱"
    },
    address: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "联系地址"
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "所属部门",
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    posId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "职位ID"
    },
    engage_form: {
      type: DataTypes.STRING(8),
      allowNull: true,
      comment: "聘用形式"
    },
    tiptop_degree: {
      type: DataTypes.ENUM('博士','硕士','本科','大专','高中','初中','小学','其他'),
      allowNull: true,
      comment: "最高学历"
    },
    specialty: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "所属专业"
    },
    school: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "毕业院校"
    },
    begin_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "入职日期"
    },
    work_state: {
      type: DataTypes.ENUM('在职','离职'),
      allowNull: true,
      defaultValue: "在职",
      comment: "在职状态"
    },
    work_id: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      comment: "工号"
    },
    contract_term: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "合同期限"
    },
    conversion_time: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "转正日期"
    },
    notWork_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "离职日期"
    },
    begin_contract: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "合同起始日期"
    },
    end_contract: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "合同终止日期"
    },
    work_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "工龄"
    },
    landline_phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "座机电话"
    },
    mobile_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "手机"
    },
    QQ: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "QQ"
    },
    performance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1代表需要绩效考核"
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "posId",
        using: "BTREE",
        fields: [
          { name: "posId" },
        ]
      },
      {
        name: "nation_id",
        using: "BTREE",
        fields: [
          { name: "nation_id" },
        ]
      },
      {
        name: "politic_id",
        using: "BTREE",
        fields: [
          { name: "politic_id" },
        ]
      },
      {
        name: "department_id",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "work_id",
        using: "BTREE",
        fields: [
          { name: "work_id" },
        ]
      },
    ]
  });
};
