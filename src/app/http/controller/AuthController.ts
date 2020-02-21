import { userDoc, jwtDoc } from '@@/migrate/schema/User'
import {
  generateAccessToken,
  generatRefreshToken
} from '@/providers/TokenServiceProvider'
import passport from 'passport'
import { Handler } from 'express'
import jwtDecode from 'jwt-decode'

export default class AuthController {
  static clowdeeLogin: Handler = passport.authenticate('clowdee', {
    session: false,
    scope: ['openid', 'profile', 'email']
  })

  static clowderLogin: Handler = passport.authenticate('clowder', {
    session: false,
    scope: ['openid', 'profile', 'email']
  })

  static clowdeeLoginRedirect: Handler = (req, res) => {
    const user = req.user as userDoc

    const accessToken = generateAccessToken(user.google_id, user.name)
    const refreshToken = generatRefreshToken(user.google_id, user.name)
    console.log('redirect clowdee user: ' + user.google_id, user.name)
    const deepLink = 'exp://127.0.0.1:19000/'

    res.redirect(
      deepLink + '?accessToken=' + accessToken + '&refreshToken=' + refreshToken
    )
  }

  static clowderLoginRedirect: Handler = (req, res) => {
    console.log('redirect in')
    const user = req.user as userDoc

    const accessToken = generateAccessToken(user.google_id, user.name)
    const refreshToken = generatRefreshToken(user.google_id, user.name)
    console.log('redirect clowder user: ' + user.google_id, user.name)

    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }

  static loginRefresh: Handler = (req, res) => {
    const decoded: jwtDoc = jwtDecode(req.header('Authorization'))

    const accessToken = generateAccessToken(decoded.sub, decoded.aud)
    const refreshToken = generatRefreshToken(decoded.sub, decoded.aud)
    console.log('refresh user: ' + decoded.sub + decoded.aud)

    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
}
