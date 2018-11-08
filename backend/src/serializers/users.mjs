import JSONAPI from 'jsonapi-serializer'

export const UserSerializer = new JSONAPI.Serializer('users', {
  attributes: [ 'username', 'role' ],
  // properties
  dataLinks: {
    self: (users, user) => `/api/v1/users/${user.id}`
  },
  keyForAttribute: 'camelCase'
})

export const UserDeserializer = new JSONAPI.Deserializer({
  keyForAttribute: 'camelCase'
})
