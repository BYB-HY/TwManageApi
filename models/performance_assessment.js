const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('performance_assessment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year_quarter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "年份和季度id"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "职员信息改为职员表中的id设外键"
    },
    completion_month: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "完成月份"
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目名"
    },
    project_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目编号"
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "当担角色"
    },
    project_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目类型"
    },
    project_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      comment: "项目金额"
    },
    outsourcing_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      comment: "外包金额"
    },
    floating_ratio: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
      comment: "浮动占比"
    },
    total_completion_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      comment: "总完成金额"
    },
    bid_assistance_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "协助投标数量"
    },
    profit_margin: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
      comment: "利润率"
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注"
    },
    extra_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "加减分项目信息"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目类型"
    }
  }, {
    sequelize,
    tableName: 'performance_assessment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
