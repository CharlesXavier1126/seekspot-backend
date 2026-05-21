import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20)
  },
  user_type: {
    type: DataTypes.ENUM('individual', 'agent', 'administrator', 'school'),
    allowNull: false,
    defaultValue: 'individual'
  }
}, {
  tableName: 'users'
});

export { User };
