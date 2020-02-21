import { connectionPool as pool } from '@/providers/DBServiceProvider'
import { SimpleHandler } from '@/http/RequestHandler'

export default class UserController {
  static checkUsers: SimpleHandler = (req, res): void => {
    const a = 'chihoon'
    pool.query(
      "SELECT * FROM user WHERE `googleID` ='" + a + "'",
      ['chihoon'],
      (err, rows, fields) => {
        if (!err) {
          console.log('The solution is: ', rows)
          res.json({
            Result: rows
          })
        } else {
          console.log('Error while performing Query.', err)
          res.status(400).json({
            err: err
          })
        }
      }
    )
  }
}
