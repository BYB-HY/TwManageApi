const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('performance_indicators', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year_quarter_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "部门id"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    indicator: {
      type: DataTypes.FLOAT(255,4),
      allowNull: true,
      comment: "指标"
    },
    completion_value: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "完成值"
    },
    ratio: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
      comment: "占比"
    },
    coefficient: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "系数"
    }
  }, {
    sequelize,
    tableName: 'performance_indicators',
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
