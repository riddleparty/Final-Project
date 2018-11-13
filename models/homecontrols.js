

module.exports = function(sequelize, DataTypes) {
    var homecontrols = sequelize.define("homecontrols", {
      unit: DataTypes.STRING,
      room: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    });
    return homecontrols;
  };
  