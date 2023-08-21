const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('performance_extra', {
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
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    detailed_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    score: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    initiator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    approver: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'performance_extra',
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
        name: "fk_year_quarter",
        using: "BTREE",
        fields: [
          { name: "year_quarter_id" },
        ]
      },
    ]
  });
};
