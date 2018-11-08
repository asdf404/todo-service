import enums from '../enums'
import Sequelize from 'sequelize'
import { sequelize } from '../db'

const { BIGINT, STRING, DATE } = Sequelize
const { ROLES } = enums

const User = sequelize.define('user', {
  id: {
    type: BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: STRING(255),
    allowNull: false,
    field: 'username'
  },
  passhash: {
    type: STRING(64),
    allowNull: false,
    field: 'passhash'
  },
  role: {
    type: STRING(16),
    allowNull: false,
    field: 'role',
    validate: {
      isIn: [ ROLES ]
    }
  },
  createdAt: {
    type: DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: DATE,
    allowNull: true,
    field: 'deleted_at'
  }
}, {
  tableName: 'users',
  paranoid: true
})

export default User
