module.exports = (sequelize, DataTypes) => {
  const Claims = sequelize.define("claims", {
    claimant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    department_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    registrar_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  return Claims;
};
