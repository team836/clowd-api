// Specify the user sign in/out end point

import express from 'express'
import UserController from '@/http/controller/UserController'
import passport from '@@/app/http/controller/Passport'

const users = express.Router()

passport.initialize()

users.get('/checkUsers', UserController.checkUsers)

users.post('/googleLogin', UserController.googleLogin)

users.get('/loginSuccess', UserController.loginSuccess)

users.get('/loginFailure', UserController.loginFailure)

// users.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/plus.login',
//       ,
//       'https://www.googleapis.com/auth/plus.profile.emails.read'
//     ]
//   })
// )
users.get(
  '/secure',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('secure response from' + JSON.stringify(req.user))
  }
)

users.get('/notsecure', (req, res) => {
  res.send('hi')
  console.log('server hi')
})

users.get('/auth/google/callback', (req, res, next) => {})

export default users
