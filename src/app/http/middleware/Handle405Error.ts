import { CldResponse, SimpleHandler } from '@/http/RequestHandler'

export default class Handle405Error {
  /**
   * Handle 405 http error.
   */
  public static handler(): SimpleHandler {
    return (req, res): CldResponse => {
      return res.status(405).json()
    }
  }
}
