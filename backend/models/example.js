module.exports = function (sequelize, DataTypes) {
  
  var Board = sequelize.define("Board", {
    switch: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  var Users = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // var homecontrols = sequelize.define("homecontrols", {
  //   unit: DataTypes.STRING,
  //   room: DataTypes.STRING,
  //   status: DataTypes.BOOLEAN,
  //   temperature: DataTypes.INTEGER,
    
  // });




  return Board, Users;
};
