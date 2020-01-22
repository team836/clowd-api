import express from 'express'
import users from '@@/routes/users'

const mainRouter = express.Router()

mainRouter.use('/users', users)

mainRouter.get('/', (req, res) => {
  res.json({
    name: 'jaesang'
  })
})

export default mainRouter
