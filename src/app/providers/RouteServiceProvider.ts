import express, { Express } from 'express'
import mainRouter from '@@/routes/api'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

export default class RouteServiceProvider {
  /**
   * Basic middleware list which is globally applied to router.
   */
  private static basicMiddleware = [
    helmet(),
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ]

  public static boot(): Express {
    const app = express()
    app.set('trust proxy', 1)
    app.use(this.basicMiddleware)
    app.use('/v1', mainRouter)

    return app
  }
}
