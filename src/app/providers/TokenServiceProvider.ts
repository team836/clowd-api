import jwt from 'jsonwebtoken'

export function generateAccessToken(googleId: string, name: string) {
  const expiresIn = '24hour'
  const issuer = process.env.JWT_issuer
  const secret = process.env.JWT_secret

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: name.toString(),
    issuer: issuer,
    subject: googleId.toString()
  })
  return token
}

export function generatRefreshToken(googleId: string, name: string) {
  const expiresIn = '72hour'
  const issuer = process.env.JWT_issuer
  const secret = process.env.JWT_secret

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: name.toString(),
    issuer: issuer,
    subject: googleId.toString()
  })
  return token
}
