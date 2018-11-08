import rbac from 'koa-rbac'
import Router from 'koa-router'
import errors from 'http-errors'
import { Task } from '../models'
import { TaskSerializer, TaskDeserializer } from '../serializers'
import { params, schema } from './middlewares'
import { TASK_STATUSES } from '../enums'

const { Forbidden, NotFound } = errors
const router = new Router()

router.param('task', async (id, ctx, next) => {
  const task = await Task.find({
    where: { id }
  })

  if (!task) {
    throw new NotFound()
  }

  ctx.params.task = task
  return next()
})

router.get(
  '/:task',
  async ({
    response,
    params: { task }
  }) => {
    response.body = TaskSerializer.serialize(task)
  }
)

router.patch(
  '/:task',
  rbac.allow([ 'tasks:edit' ]),
  schema('/api/v1/schemas/task'),
  async ({
    response,
    request,
    params: { task },
    state: { user }
  }) => {
    if (task.userId !== user.id || !(await rbac.check('authorized:admin'))) {
      throw new Forbidden()
    }

    const data = await TaskDeserializer.deserialize(request.body)

    await task.update({
      status: data.status || task.status,
      priority: (typeof data.priority !== 'undefined') ? data.priority : task.priority,
      content: data.content || task.content
    })

    response.body = TaskSerializer.serialize(task)
  }
)

router.delete(
  '/:task',
  rbac.allow([ 'tasks:delete' ]),
  async ({
    response,
    params: { task },
    state: { user }
  }) => {
    // only owner or admin can delete task
    if (task.userId === user.id || await rbac.check('authorized:admin')) {
      await task.destroy()
    }

    response.status = 204
    response.body = {}
  }
)

router.post(
  '/',
  rbac.allow([ 'tasks:create' ]),
  schema('/api/v1/schemas/task'),
  async ({
    response,
    request,
    state
  }) => {
    const data = await TaskDeserializer.deserialize(request.body)

    const task = await Task.create({
      userId: state.user.id,
      status: TASK_STATUSES.PENDING,
      priority: data.priority || 0,
      content: data.content || ''
    })

    response.status = 201
    response.body = TaskSerializer.serialize(task)
  }
)

router.get(
  '/',
  params.query({
    'filter[all]': params.parsers.boolean(),
    'filter[status]': params.parsers.string(null),
    'filter[priority]': params.parsers.number(null)
  }),
  async ({
    response,
    request,
    rbac,
    state: { user }
  }) => {
    const { query } = request
    const criteria = { userId: user.id }

    // show all tasks (only for admin)
    if (await rbac.check('authorized:admin')) {
      delete criteria.userId
    }
    // filter by status
    if (query['filter[status]']) {
      criteria.status = query['filter[status]']
    }
    // filter by priority
    if (query['filter[priority]'] !== null) {
      criteria.priority = query['filter[priority]']
    }

    const [ total, data ] = await Promise.all([
      Task.count({ where: criteria }),
      Task.findAll({
        where: criteria,
        // load user data if it required
        include: query.include.includes('author')
          ? [{ association: Task.User, required: true }]
          : [],
        order: [
          [ 'createdAt', 'desc' ]
        ],
        offset: query['page[offset]'],
        limit: query['page[limit]']
      })
    ])

    response.body = {
      meta: { total },
      ...TaskSerializer.serialize(data)
    }
  }
)

export default router.routes()
