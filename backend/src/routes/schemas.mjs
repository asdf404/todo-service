import Router from 'koa-router'
import * as schemas from '../schemas'

const router = new Router()

for (let schema of Object.values(schemas)) {
  router.get(
    schema.$id.slice('/api/v1/schemas'.length),
    async ({ response }) => {
      response.body = schema
    }
  )
}

export default router.routes()
