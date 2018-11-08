import logger from 'winston'
import shutdown from 'http-shutdown'
import app from './application'

const PORT = parseInt(process.env.PORT, 10)
const server = shutdown(app.listen(PORT || 8080, () => {
  logger.info('server:started')
}))

function stop () {
  server.shutdown(() => {
    logger.info('server:stopped')
    process.exit(0)
  })
}

export default server

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
