import bcrypt from 'bcryptjs'
import { sequelize } from '../db'
import { User } from '../models'
import { ROLES } from '../enums'
import { action } from './utils'

const commands = {
  async create ({ password, username, role }) {
    if (!/^([a-zA-Z][a-zA-Z0-9_-]{1,200})$/.test(username)) {
      throw new Error('invalid username')
    }
    if (!ROLES.includes(role.toUpperCase())) {
      throw new Error('invalid role')
    }

    return sequelize.transaction(async transaction => {
      const user = await User.create({
        username,
        passhash: await bcrypt.hash(password, 10),
        role: role.toUpperCase()
      }, { transaction })

      console.log(`user "${username}" created, id=${user.id}`)
    })
  }
}

export default function (program) {
  return program
    .command('user <action>')
    .description('create new user')
    .option('-u, --username <username>', 'user name')
    .option('-p, --password <password>', 'preferred password')
    .option('-r, --role <role>', 'role: "user" or "admin"', 'user')
    .action(action(async function (cmd, options) {
      await commands[cmd](options, program)
    }))
    .on('--help', function () {
      console.log()
      console.log('  Examples:')
      console.log()
      console.log('    $ npm run user:create --username admin --password 123 --role admin')
      console.log()
    })
}
