import Sequelize from 'sequelize'
import { sequelize } from '../db'
import { TASK_STATUSES } from '../enums'

const { BIGINT, INTEGER, STRING, TEXT, DATE } = Sequelize

const Task = sequelize.define('task', {
  id: {
    type: BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: BIGINT,
    allowNull: false,
    field: 'user_id'
  },
  status: {
    type: STRING(16),
    field: 'status',
    allowNull: false,
    defaultValue: TASK_STATUSES.PENDING
  },
  priority: {
    type: INTEGER,
    field: 'priority',
    allowNull: false,
    defaultValue: 0
  },
  content: {
    type: TEXT,
    allowNull: false,
    field: 'content'
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
  tableName: 'tasks',
  paranoid: true
})

export default Task
