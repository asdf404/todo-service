export default {
  $id: '/api/v1/schemas/auth',
  definitions: {
    credentials: {
      type: 'object',
      properties: {
        username: { $ref: '/api/v1/schemas/common#/definitions/username' },
        password: {
          type: 'string',
          minLength: 1,
          description: 'Password for user',
          example: 'bob123'
        }
      },
      required: [ 'username', 'password' ]
    },
    token: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          readOnly: true,
          description: 'Access token',
          example: 'AAAtI0:APA91b...HEXMH'
        }
      }
    },
    response: {
      type: 'object',
      properties: {
        type: {
          allOf: [
            { enum: [ 'auth' ], example: 'auth' },
            { readOnly: true }
          ]
        },
        id: { $ref: '/api/v1/schemas/common#/definitions/id' },
        attributes: { $ref: '#/definitions/token' }
      }
    }
  }
}
