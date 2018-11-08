import JSONAPI from 'jsonapi-serializer'

export const TaskSerializer = new JSONAPI.Serializer('tasks', {
  attributes: [ 'user', 'content', 'status', 'priority', 'createdAt' ],
  // attributes
  user: {
    ref: 'id',
    attributes: [ 'username', 'role' ],
    included: true
  },
  // properties
  dataLinks: {
    self: (tasks, task) => `/api/v1/tasks/${task.id}`
  },
  keyForAttribute: 'camelCase'
})

export const TaskDeserializer = new JSONAPI.Deserializer({
  user: {
    valueForRelationship: function (relationship) {
      return {
        id: relationship.id
      }
    }
  },
  keyForAttribute: 'camelCase'
})
