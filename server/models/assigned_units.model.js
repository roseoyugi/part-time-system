module.exports = (sequelize, DataTypes) => {
  return sequelize.define("assigned_units", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
