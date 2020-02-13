import express, { Express } from 'express'
import mainRouter from '@@/routes/api'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import Handle404Error from '@/http/middleware/Handle404Error'
import HandleSyntaxError from '@/http/middleware/HandleSyntaxError'
import Handle500Error from '@/http/middleware/Handle500Error'

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

  /**
   * Error handler middleware list which handle http error.
   */
  private static errorMiddleware = [
    Handle404Error.handler(),
    HandleSyntaxError.handler(),
    Handle500Error.handler()
  ]

  public static boot(): Express {
    const app = express()
    app.set('trust proxy', 1)
    app.use(this.basicMiddleware)
    app.use('/v1', mainRouter)
    app.use(this.errorMiddleware)

    return app
  }
}
