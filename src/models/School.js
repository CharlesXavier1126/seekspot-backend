import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

const School = sequelize.define('School', {
  id: {
    type: DataTypes.CHAR(6),
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  latitude: { type: DataTypes.DECIMAL(10, 6) },
  longitude: { type: DataTypes.DECIMAL(10, 6) },
  image1: { type: DataTypes.STRING },
  quota: { type: DataTypes.INTEGER },
  comment: { type: DataTypes.TEXT }
}, {
  tableName: 'schools'
});

export { School };
