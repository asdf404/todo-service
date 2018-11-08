import jwt from 'jsonwebtoken'
const {
  JWT_SECRET, ACCESS_TOKEN_TTL = '30d', DOMAIN_NAME
} = process.env

export function generate (data, { expiresIn }) {
  return jwt.sign(
    data,
    JWT_SECRET,
    {
      expiresIn
    }
  )
}

export function access (data) {
  return generate(
    data,
    {
      issuer: DOMAIN_NAME,
      audience: 'access',
      expiresIn: ACCESS_TOKEN_TTL
    }
  )
}

export function parse (token, opts) {
  return jwt.verify(token, JWT_SECRET, opts)
}
