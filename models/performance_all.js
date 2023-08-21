const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('performance_all', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    team: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    completion_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    profit_margin: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    bidding: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cooperation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    winning_bids: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    execution_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    assessment_coefficient: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    assessment_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    performance_salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_payment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quarter: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'performance_all',
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
      {
        name: "uk_name_year",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
          { name: "year" },
        ]
      },
      {
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "year" },
        ]
      },
    ]
  });
};
