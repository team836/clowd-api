import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

const users = express.Router()

// passport.use(
//   new Strategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/login/google/callback'
//   }. ())
// )


users.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

users.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' })
})

users.get('/login/google', (req, res, next) => {
  res.json({
    name: 'jaesang'
  })
})

users.get('/login/google/callback', (req, res, next) => {})

export default users
