const { DataTypes } = require("sequelize")
const sequelize = require('../Config/DatabaseDB');
const User = require('./User');
const Admin = require('./Admin');

const Chauffeur = sequelize.define('Chauffeur', {
    driver_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'user_id'
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      license_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vehicle_info: {
        type: DataTypes.STRING,
        allowNull: false
      },
      availability_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      admin_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Admin,
          key: 'admin_id'
        }
      }
    }, {
      timestamps: false
    });
module.exports = Chauffeur;