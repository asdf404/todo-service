import passport from 'koa-passport'
import Router from 'koa-router'
import { params } from './middlewares'
import authRoutes from './auth'
import tasksRoutes from './tasks'
import usersRoutes from './users'
import schemasRoutes from './schemas'
const router = new Router()

router.use(params.query({
  'page[offset]': params.parsers.number(0),
  'page[limit]': params.parsers.number(50),
  'include': params.parsers.array()
}))

router.use(
  '/api/v1/auth',
  passport.authenticate([ 'jwt', 'anonymous' ], { session: false }),
  authRoutes
)
router.use(
  '/api/v1/tasks',
  passport.authenticate([ 'jwt' ], { session: false }),
  tasksRoutes
)
router.use(
  '/api/v1/users',
  passport.authenticate([ 'jwt' ], { session: false }),
  usersRoutes
)
router.use(
  '/api/v1/schemas',
  schemasRoutes
)

export default router.routes()
