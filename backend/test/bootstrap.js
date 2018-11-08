try {
  require('winston').remove('console')
} catch (e) {}

global.ENABLED_TESTS = {
  api: true,
  schemas: true
}
