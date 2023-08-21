const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "权限名称"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "权限类型"
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "分组类型"
    },
    class_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "分组名称"
    },
    isParent: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "true：父级，false：子级"
    },
    disabled: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "是否禁用"
    }
  }, {
    sequelize,
    tableName: 'permissions',
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
