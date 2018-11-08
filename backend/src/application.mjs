import http from 'http'
import Koa from 'koa'
import body from 'koa-body'
import passport from 'koa-passport'
import override from 'koa-methodoverride'
import conditional from 'koa-conditional-get'
import morgan from 'koa-morgan'
import etag from 'koa-etag'
import cors from 'koa2-cors'
import logger from 'winston'
import errors from 'http-errors'
import { ERROR_CODES } from './enums'
import rbac from './rbac'
import './passport'
import routes from './routes'

const { Unauthorized, Forbidden, NotFound } = errors
const { DOMAIN_NAME, NODE_ENV } = process.env
const DEBUG = NODE_ENV === 'development'

const app = new Koa()

const { SESSION_SECRET } = process.env
app.keys = [ SESSION_SECRET ]

app.use(body({ multipart: true, multiples: false }))
app.use(override())
app.use(conditional())
app.use(etag())

const ALLOWED_ORIGINS = [
  `https://${DOMAIN_NAME}`,
  `http://${DOMAIN_NAME}`
]
app.use(cors({
  origin: ({ request: { header: { origin } } }) => {
    if (ALLOWED_ORIGINS.includes(origin)) {
      return origin
    }
    return false
  },
  maxAge: 60,
  allowMethods: [ 'GET', 'POST', 'DELETE', 'PUT', 'PATCH' ],
  credentials: true
}))
app.use(rbac)

/* istanbul ignore next */
if (DEBUG) {
  app.use(morgan('tiny'))
}

app.use(async ({ response, state }, next) => {
  // errors handling
  try {
    await next()
    // passportjs workaround. so annoying :(
    if (response.status === 401) {
      throw new Unauthorized()
    } else if (response.status === 403) {
      throw new Forbidden()
    }
  } catch (err) {
    response.status = err.status || 500
    /* istanbul ignore next */
    if (!err.status || err.status >= 500) {
      logger.error('server', {
        error: err.message,
        stack: err.stack
      })
    }

    if (err.toJSON) {
      response.body = {
        error: err.toJSON()
      }
    } else {
      response.body = {
        error: {
          message: err.message || http.STATUS_CODES[500],
          code: err.code || ERROR_CODES.UNKNOWN
        }
      }
    }
  }
})

app.use(passport.initialize())
app.use(routes)
app.use(() => {
  throw new NotFound()
})

export default app
