const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_assets', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'employee_id'
      }
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'assets',
        key: 'asset_id'
      }
    }
  }, {
    sequelize,
    tableName: 'employee_assets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_id" },
          { name: "asset_id" },
        ]
      },
      {
        name: "asset_id",
        using: "BTREE",
        fields: [
          { name: "asset_id" },
        ]
      },
    ]
  });
};
