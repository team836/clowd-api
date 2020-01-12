import express, { Express } from 'express'
import mainRouter from '@@/routes/api'

export default class RouteServiceProvider {
  public static boot(): Express {
    const app = express()
    app.set('trust proxy', 1)
    app.use('/v1', mainRouter)

    return app
  }
}
