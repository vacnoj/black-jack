module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        }
    });
    return User;
}