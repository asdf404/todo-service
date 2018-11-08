import dotenv from 'dotenv'
dotenv.config()

if (process.env.NODE_ENV === 'development') {
  import('nodemon')
    .then(({ default: nodemon }) => {
      nodemon({
        script: './src/server.mjs',
        ext: 'js,mjs,yml,md,graphql',
        exec: 'node --harmony --experimental-modules'
      })

      nodemon
        .on('restart', function (files) {
          console.log('app restarted due to:', ...files)
        })
    })
    .catch(e => {
      console.error(e)
    })
} else {
  import('./src/server')
    .catch(e => {
      console.error(e)
    })
}
