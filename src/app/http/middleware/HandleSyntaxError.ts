import { CldResponse, ErrorHandler } from '@/http/RequestHandler'

export default class HandleSyntaxError {
  /**
   * Handle request syntax error.
   */
  public static handler(): ErrorHandler {
    return (err, req, res, next): CldResponse | void => {
      if (err instanceof SyntaxError) {
        return res.status(400).json({
          err: {
            msg: 'Request syntax error'
          }
        })
      } else {
        next()
      }
    }
  }
}
