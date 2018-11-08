import rbac from 'koa-rbac'
import errors from 'http-errors'
import { ROLES } from './enums'

const { Unauthorized, Forbidden } = errors

const roles = {
  [ ROLES.USER ]: {
    permissions: [
      'authorized:user', // just flag client is logged in as user
      'tasks:create', // allow to create tasks
      'tasks:edit', // allow to edit tasks
      'tasks:delete' // allow to delete tasks
    ],
    inherited: []
  },
  [ ROLES.ADMIN ]: {
    permissions: [
      'authorized:admin' // just flag client is logged in as admin
    ],
    inherited: [
      ROLES.USER
    ]
  }
}

class Provider extends rbac.RBAC.providers.JsonProvider {
  getRoles (user) {
    const rules = this._rules || {}
    const cache = {}

    return (function collect (roles, userRoles, depth) {
      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        cache[roles[i]] = cache[roles[i]] || depth
      }

      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        if (cache[roles[i]] >= depth) {
          let role = rules['roles'] && rules['roles'][roles[i]]

          if (role) {
            if (Array.isArray(role['inherited'])) {
              userRoles[roles[i]] = collect(role['inherited'], {}, depth + 1)
            } else {
              userRoles[roles[i]] = null
            }
          }
        }
      }

      return userRoles
    })(user ? [user.role || ROLES.USER] : [], {}, 1)
  }
}

const middleware = rbac.middleware({
  rbac: new rbac.RBAC({
    provider: new Provider({ roles })
  }),
  identity: ctx => ctx && ctx.state && ctx.state.user,
  restrictionHandler: ({ state: { user } }, permissions, redirect) => {
    if (!user) {
      throw new Unauthorized()
    } else {
      throw new Forbidden()
    }
  }
})

export default middleware
