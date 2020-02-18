import express from 'express'
import users from '@@/routes/users'
import auth from '@@/routes/auth'
import passport from '@@/app/http/controller/Passport'

const mainRouter = express.Router()

passport.initialize()

mainRouter.use('/auth', auth)
mainRouter.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  users
)

mainRouter.get('/', (req, res) => {
  res.json({
    name: 'jaesang'
  })
})

export default mainRouter
