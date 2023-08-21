const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "账号"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "密码"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户名"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "创建时间"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: "状态：0 正常，1 关闭"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "备注"
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
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
