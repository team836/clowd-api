import pool from '@/providers/DBServiceProvider'
import { SimpleHandler } from '@/http/RequestHandler'

export default class UserController {
  // public static checkUsers(): void {
  //   pool.query('SELECT * from Users', (err, rows, fields) => {
  //     if (!err) {
  //       console.log('The solution is: ', rows)
  //       res.json(rows)
  //     } else console.log('Error while performing Query.', err)
  //   })
  // }
  static checkUsers: SimpleHandler = (req, res): void => {
    pool.query('sudo SELECT * from Users', (err, rows, fields) => {
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
    })
  }
}
