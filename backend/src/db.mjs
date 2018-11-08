import url from 'url'
import Sequelize from 'sequelize'
// import Redis from 'ioredis'

const { /*REDIS_URL,*/ POSTGRES_URL } = process.env

// export const redis = new Redis(REDIS_URL)

export const sequelize = (() => {
  const uri = url.parse(POSTGRES_URL)
  const [ user, pass ] = uri.auth.split(':')
  const db = uri.pathname.slice(1)

  return new Sequelize(db, user, pass, {
    host: uri.host,
    port: uri.port,
    dialect: 'postgres',
    protocol: 'postgres',
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    pool: {
      maxConnections: 5,
      maxIdleTime: 30
    },
    // disable annoying deprecation warning
    // see https://github.com/sequelize/sequelize/issues/8417
    operatorsAliases: Sequelize.Op,
    logging: false // dump sql query to stdout
  })
})()
