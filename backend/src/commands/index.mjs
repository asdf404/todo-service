import program from 'commander'
import build from '../../package.json'
import user from './user'

program
  .option('-s, --silent', 'fail silent and return 0 status')
  .version(build.version)

user(program)

program
  .parse(process.argv)
