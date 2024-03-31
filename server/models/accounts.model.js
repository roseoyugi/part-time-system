module.exports = (sequelize, DataTypes) => {
  return sequelize.define("accounts", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
