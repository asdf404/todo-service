import { TASK_STATUSES } from '../enums'

export default {
  $id: '/api/v1/schemas/task',
  definitions: {
    header: {
      type: 'object',
      properties: {
        type: {
          allOf: [
            { enum: [ 'tasks' ], example: 'tasks' },
            { readOnly: true }
          ]
        },
        id: {
          allOf: [
            { $ref: '/api/v1/schemas/common#/definitions/id' },
            { readOnly: true }
          ]
        }
      }
    },
    attributes: {
      type: 'object',
      properties: {
        status: {
          enum: TASK_STATUSES,
          example: TASK_STATUSES.PENDING
        },
        priority: {
          type: 'number',
          example: 2
        },
        content: {
          type: 'string',
          example: 'Have fun'
        },
        createdAt: {
          allOf: [
            { $ref: '/api/v1/schemas/common#/definitions/date' },
            { readOnly: true }
          ]
        }
      }
    },
    relationships: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          readOnly: true,
          properties: {
            data: { $ref: '/api/v1/schemas/user#/definitions/header' }
          },
          additionalProperties: false,
          required: [ 'data' ]
        }
      }
    }
  },
  type: 'object',
  properties: {
    data: {
      allOf: [
        { $ref: '#/definitions/header' },
        {
          type: 'object',
          properties: {
            attributes: { $ref: '#/definitions/attributes' },
            relationships: { $ref: '#/definitions/relationships' },
            included: {
              type: 'array',
              readOnly: true,
              items: { type: 'object' }
            }
          }
        }
      ]
    }
  },
  additionalProperties: false
}
