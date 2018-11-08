function error (code) {
  return {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: [ code ], example: code },
          message: {
            type: 'string',
            description: 'Human-friendly error message'
          }
        }
      }
    }
  }
}

export default {
  $id: '/api/v1/schemas/error',
  definitions: {
    bad_request: error('BAD_REQUEST'),
    unauthorized: error('UNAUTHORIZED'),
    forbidden: error('FORBIDDEN'),
    not_found: error('NOT_FOUND'),
    validation_error: error('VALIDATION_FAILED')
  }
}
