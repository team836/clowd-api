import mysql, { Connection, Pool } from 'mysql'

export default class DBConnector {
  private static _instance: DBConnector

  private pool: Pool

  private _conn: Connection

  /**
   * Get singleton instance
   *
   * @constructor
   */
  public static get Instance(): DBConnector {
    if (this._instance === undefined) {
      this._instance = new this()
    }

    return this._instance
  }

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      charset: 'utf8mb4'
    })
  }

  /**
   * Get database connection from pool
   */
  public async connect(): Promise<void> {
    this._conn = await new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        }

        resolve(connection)
      })
    })
  }

  public get conn(): Connection {
    return this._conn
  }
}
