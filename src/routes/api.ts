import express from 'express'
import users from '@@/routes/users'

const mainRouter = express.Router()

mainRouter.get('/', (req, res) => {
  res.json({
    name: 'jaesang'
  })
})

mainRouter.use('/users', users)

export default mainRouter
