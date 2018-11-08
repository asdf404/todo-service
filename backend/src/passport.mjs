import bcrypt from 'bcryptjs'
import passport from 'koa-passport'
import PassportAnonymous from 'passport-anonymous'
import PassportJWT from 'passport-jwt'
import PassportLocal from 'passport-local'
import errors from 'http-errors'
import { User } from './models'

const { Forbidden } = errors
const { JWT_SECRET } = process.env

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  return User.findOne({ where: { id } })
    .then(user => done(null, user))
    .catch(err => done(err))
})

passport.use('anonymous', new PassportAnonymous.Strategy())

passport.use('local', new PassportLocal.Strategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    const user = await User.find({
      where: { username }
    })

    if (!user) {
      return done(new Forbidden())
    }

    if (!(await bcrypt.compare(password, user.passhash))) {
      return done(new Forbidden())
    }

    return done(null, user)
  })
)

passport.use(
  'jwt',
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async function (payload, done) {
      const user = await User.findOne({ where: { id: payload.sub } })
      done(null, user)
    }
  )
)
