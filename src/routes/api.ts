import express from 'express'
import users from '@@/routes/users'
import auth from '@@/routes/auth'

const mainRouter = express.Router()

mainRouter.use('/auth', auth)
mainRouter.use('/users', users)

mainRouter.get('/', (req, res) => {
  res.json({
    name: 'jaesang'
  })
})

export default mainRouter
