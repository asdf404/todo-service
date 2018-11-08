import User from './User'
import Task from './Task'

User.Tasks = User.hasMany(Task, { as: 'tasks', foreignKey: 'userId' })
Task.User = Task.belongsTo(User, { as: 'user', foreignKey: 'userId' })

export { User, Task }
