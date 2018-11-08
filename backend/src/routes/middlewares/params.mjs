// TODO: extract to separate module
import R from 'ramda'

const parse = R.curry(function parse (field, parsers) {
  const keys = Object.keys(parsers)

  return function middleware (ctx, next) {
    for (let key of keys) {
      ctx.request[field][key] = parsers[key](ctx[field][key], ctx)
    }
    return next()
  }
})

export const query = parse('query')

const TRUE_VALUES = [ 'true', 'on', 'yes', 'y', '1' ]
export const parsers = {
  boolean: (init = false) => (value) => typeof value === 'undefined' ? init : TRUE_VALUES.includes(value),
  number: (init = 0) => (value = '') => {
    if (!value) return init
    const result = parseInt(value, 10)
    if (Number.isNaN(result)) return init
    return result
  },
  string: (init = '') => (value = '') => value ? String(value) : init,
  array: (cast = parsers.string()) => (value = '') => (Array.isArray(value) ? value[0] : value)
    .split(',')
    .filter(Boolean)
    .map(cast)
}

export default { parsers, query }
