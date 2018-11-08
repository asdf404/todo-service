const {
  UniqueConstraintError, SequelizeValidationError
} = require('sequelize')

const {
  Unauthorized, BadRequest, Forbidden, NotFound, Conflict, InternalServerError
} = require('http-errors')
const { ERROR_CODES } = require('./enums')

Unauthorized.prototype.code = 'UNAUTHORIZED'
BadRequest.prototype.code = 'BAD_REQUEST'
Forbidden.prototype.code = 'FORBIDDEN'
NotFound.prototype.code = 'NOT_FOUND'
Conflict.prototype.code = 'CONFLICT'

function mapError (e) {
  if (e instanceof UniqueConstraintError) {
    return new Conflict()
  } else if (e instanceof SequelizeValidationError) {
    return new BadRequest()
  } else {
    return new InternalServerError()
  }
}

class ValidationError extends BadRequest {
  constructor (message, errors) {
    super()
    this.message = message || 'Validation error'
    this.code = ERROR_CODES.VALIDATION_FAILED
    this.errors = errors
    // ugly hack
    // in some reason ValidationError#toJSON doesn't appear in ValidationError instance
    this.toJSON = ValidationError.prototype.toJSON
  }

  toJSON () {
    return {
      code: ERROR_CODES.VALIDATION_FAILED,
      message: this.message,
      errors: this.errors
    }
  }
}

class BadToken extends BadRequest {
  constructor (...args) {
    super(...args)
    this.message = 'Invalid or expired token'
    this.code = ERROR_CODES.BAD_TOKEN
  }
}

class AccountAlreadyUsed extends Conflict {
  constructor (...args) {
    super(...args)
    this.message = 'Account already linked to another user'
    this.code = ERROR_CODES.ACCOUNT_ALREADY_LINKED
  }
}

module.exports = {
  ...module.exports,
  mapError,
  // user errors
  InsufficientFunds,
  UnknownApplication,
  BadToken,
  AccountAlreadyUsed,
  // validation errors
  ValidationError
}
