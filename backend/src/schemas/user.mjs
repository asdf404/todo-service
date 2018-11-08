import { ROLES } from '../enums'

export default {
  $id: '/api/v1/schemas/user',
  definitions: {
    header: {
      type: 'object',
      properties: {
        type: {
          allOf: [
            { enum: [ 'users' ], example: 'users' },
            { readOnly: true }
          ]
        },
        id: {
          allOf: [
            { $ref: '/api/v1/schemas/common#/definitions/id' },
            { readOnly: true }
          ]
        }
      },
      additionalProperties: false
    },
    attributes: {
      type: 'object',
      properties: {
        username: { $ref: '/api/v1/schemas/common#/definitions/username' },
        role: { $ref: '#/definitions/role' }
      }
    },
    role: {
      enum: ROLES,
      description: 'User role',
      example: ROLES.USER
    }
  },
  type: 'object',
  allOf: [
    { $ref: '#/definitions/header' },
    {
      type: 'object',
      properties: {
        attributes: { $ref: '#/definitions/attributes' }
      }
    }
  ],
  additionalProperties: false
}
