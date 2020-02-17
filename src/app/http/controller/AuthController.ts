import pool from '@/providers/DBServiceProvider'
import { SimpleHandler } from '@/http/RequestHandler'
import passport from 'passport'
import { Handler } from 'express'
import jwt = require('jsonwebtoken')

export default class AuthController {
  static login: Handler = (req, res, next): void => {
    passport.authenticate('google', {
      session: false,
      scope: ['openid', 'profile', 'email']
    })
    //{
    //   if (err || !user) {
    //     return res.status(400).json({
    //       message: 'Something is not right',
    //       user: user
    //     })
    //   }
    //   req.login(user, { session: false }, err => {
    //     if (err) {
    //       res.send(err)
    //     }
    //   })
    //   const token = jwt.sign(user, process.env.JWT_secret)
    //   return res.json({ user, token })
    // })(req, res)
    //}
  }
}
