module.exports = (sequelize, DataTypes) => {
  const Units = sequelize.define("units", {
    unit_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cf: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Units;
};
