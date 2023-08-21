const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role_table', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "用户id",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    rid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "角色id",
      references: {
        model: 'role_table',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role_table',
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
        name: "rid",
        using: "BTREE",
        fields: [
          { name: "rid" },
        ]
      },
      {
        name: "uid",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
};
