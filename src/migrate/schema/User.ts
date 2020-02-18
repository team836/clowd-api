export type userDoc = {
  googleID: string
  email: string
  image: string
  signedInAt: Date
  singnedUpAt: Date
  name: string
}

export type jwtDoc = {
  iat: string
  exp: string
  aud: string
  iss: string
  sub: string
}
