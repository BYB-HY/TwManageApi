const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('performance_summary', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    first_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "第一季度"
    },
    first_indicator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    first_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    second_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "第一季度"
    },
    second_indicator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    second_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    third_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "第一季度"
    },
    third_indicator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    third_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fourth_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "第一季度"
    },
    fourth_indicator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fourth_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    assessment_result: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "评估结果"
    },
    average_score: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "平均数"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'performance_summary',
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
