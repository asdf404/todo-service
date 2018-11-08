// TODO: extract to separate module
import errors from 'http-errors'
import Ajv from 'ajv'
import * as schemas from '../../schemas'

const { BadRequest } = errors
const ajv = new Ajv({
  schemaId: '$id',
  allErrors: true,
  useDefaults: true,
  coerceTypes: false
})

for (let schema of Object.values(schemas)) {
  ajv.addSchema(schema, schema.$id)
}

function parseError (value) {
  return {
    path: value.dataPath || '.',
    message: value.message
  }
}

export default function validate (schema) {
  if (!schema) {
    throw new Error('JSON schema is not defined')
  }

  return function middleware (ctx, next) {
    const valid = ajv.validate(schema, ctx.request.body)
    if (!valid) {
      throw new BadRequest(
        'Validation error', ajv.errors.map(parseError).filter(Boolean)
      )
    }
    return next()
  }
}
