// Specify the user sign in/out end point

import express from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import UserController from '@/http/controller/UserController'

const users = express.Router()

// passport.use(
//   new GoogleStrategy(
//     {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/v1/users/auth/google/callback',
//   passReqToCallback: true
//     },

// function(req, accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function(err, user) {
//         return done(err, user)
//   })
// }))
// )

users.get('/checkUsers', UserController.checkUsers)

users.get('/auth', (req, res, next) => {
  res.render('login', { title: 'Login' })
})

users.get('/auth/google', (req, res, next) => {
  res.json({
    //
  })
})

users.get('/auth/google/callback', (req, res, next) => {})

export default users
