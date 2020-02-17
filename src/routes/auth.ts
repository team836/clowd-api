import express from 'express'
import jwt from 'jsonwebtoken'
import { userDoc } from '@@/migrate/schema/User'
import passport from '@@/app/http/controller/Passport'
import AuthController from '@/http/controller/AuthController'
import generateAccessToken from '@/providers/TokenServiceProvider'

const auth = express.Router()

passport.initialize()

auth.get(
  '/login',
  passport.authenticate('google', {
    session: false,
    scope: ['openid', 'profile', 'email']
  })
)

auth.get(
  '/login/redirect',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user as userDoc

    res.json({
      accessToken: generateAccessToken(user.name)
    })
  }
)

auth.get('/dev', (req, res) => {
  res.send('work')
})

export default auth
