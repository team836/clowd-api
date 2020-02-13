import jwt from 'jsonwebtoken'

function generateAccessToken(name: string) {
  const expiresIn = '12hour'
  //const issuer = process.env.JWT_issuer
  //const audience = process.env.JWT_audience
  const secret = process.env.JWT_secret

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    //audience: audience,
    //issuer: issuer,
    subject: name.toString()
  })
  return token
}

export default generateAccessToken
