import passport from '@@/app/http/controller/Passport'
import AuthController from '@/http/controller/AuthController'
import express from 'express'
// import jwt from 'jsonwebtoken'
// import { userDoc } from '@@/migrate/schema/User'

const auth = express.Router()

passport.initialize()

auth.get('/clowder/login', AuthController.clowderLogin)

auth.get('/clowdee/login', AuthController.clowdeeLogin)

auth.get(
  '/clowdee/login/redirect',
  passport.authenticate('clowdee', { session: false }),
  AuthController.clowdeeLoginRedirect
)

auth.get(
  '/clowder/login/redirect',
  passport.authenticate('clowder', { session: false }),
  AuthController.clowderLoginRedirect
)

auth.get(
  '/login/refresh',
  passport.authenticate('jwt', { session: false }),
  AuthController.loginRefresh
)

export default auth
