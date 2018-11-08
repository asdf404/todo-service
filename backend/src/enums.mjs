function toEnum (enums) {
  enums.forEach((key) => {
    Object.defineProperty(enums, key, {
      enumerable: false,
      get () { return key }
    })
  })

  return enums
}

export const ERROR_CODES = toEnum([
  'UNKNOWN', // Unknown error
  'VALIDATION_FAILED', // Validation error
  'BAD_TOKEN' // Invalid or expired token
])

export const ROLES = toEnum([
  'GUEST',
  'USER',
  'ADMIN'
])

export const TASK_STATUSES = toEnum([
  'PENDING',
  'IN_PROGRESS',
  'DONE'
])

export default {
  ERROR_CODES, ROLES, TASK_STATUSES
}
