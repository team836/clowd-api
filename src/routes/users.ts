import express from 'express'
import passport from 'passport'
import Google from 'passport-google-oauth20'

const users = express.Router()
const GoogleStrategy = Google.Strategy()

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/google/callback'
  })
)

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
