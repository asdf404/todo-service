export default {
  $id: '/api/v1/schemas/common',
  definitions: {
    id: {
      type: 'integer',
      min: 1,
      example: 1024,
      description: 'ID'
    },
    username: {
      type: 'string',
      pattern: '^([a-zA-Z][a-zA-Z0-9_-]{1,200})$',
      minLength: 2,
      description: 'Some url-friendly name',
      example: 'john-doe'
    },
    date: {
      type: 'string',
      description: 'UTC Date in ISO format',
      example: '2018-10-09T08:33:28.221Z'
    }
  }
}
