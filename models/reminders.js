const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reminders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "标题"
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "到期时间"
    },
    recurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "循环"
    },
    recurring_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "循环类型"
    },
    recurring_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "循环值"
    },
    descr: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注"
    },
    enabled: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: "1为开启，0为关闭"
    }
  }, {
    sequelize,
    tableName: 'reminders',
    timestamps: true,
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
