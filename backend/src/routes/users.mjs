import rbac from 'koa-rbac'
import cacheControl from 'koa-cache-control'
import Router from 'koa-router'
import { UserSerializer } from '../serializers'

const router = new Router()

router.get(
  '/self',
  cacheControl({ private: true, noCache: true, noStore: true }),
  rbac.allow([ 'authorized:user' ]),
  async ({
    response,
    request: { query },
    state: { user }
  }) => {
    response.body = UserSerializer.serialize(user)
  }
)

export default router.routes()
