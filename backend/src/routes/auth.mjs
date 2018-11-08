import logger from 'winston'
import bcrypt from 'bcryptjs'
import passport from 'koa-passport'
import cacheControl from 'koa-cache-control'
import Router from 'koa-router'
import errors from 'http-errors'
import { User } from '../models'
import { schema } from './middlewares'
import * as jwt from '../jwt'
import { ROLES } from '../enums'
import { sequelize } from '../db'

const { Forbidden } = errors
const router = new Router()

router.post(
  '/register',
  cacheControl({ private: true, noCache: true, noStore: true }),
  schema('/api/v1/schemas/auth#/definitions/credentials'),
  (ctx) => {
    return sequelize.transaction(async transaction => {
      const {
        response,
        request: { body }
      } = ctx
      const { username, password } = body

      const user = await User.create({
        username,
        passhash: await bcrypt.hash(password, 10),
        role: ROLES.USER
      }, { transaction })
        .catch(e => {
          // if something bad was happening, just throw 403
          throw new Forbidden()
        })

      logger.info('users:register', { user: user.id })
      response.status = 201
      response.body = {
        data: {
          type: 'auth',
          id: user.id,
          attributes: {
            token: jwt.access({ sub: user.id })
          }
        }
      }
    })
  }
)

router.post(
  '/login',
  cacheControl({ private: true, noCache: true, noStore: true }),
  schema('/api/v1/schemas/auth#/definitions/credentials'),
  passport.authenticate('local', { session: false }),
  async ({ response, state: { user } }) => {
    logger.info('users:login', { user: user.id })
    response.body = {
      data: {
        type: 'auth',
        id: user.id,
        attributes: {
          token: jwt.access({ sub: user.id })
        }
      }
    }
  }
)

export default router.routes()
