import mysql from 'mysql'

export const connectionPool = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: parseInt(process.env.DB_port),
  password: process.env.DB_password,
  database: process.env.DB_database,
  multipleStatements: true
})

export class DBServiceProvider {
  static createUserDB() {
    console.log('userDB method called!')
    connectionPool.query(
      'CREATE TABLE IF NOT EXISTS users (google_id VARCHAR(63) PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, name VARCHAR(63) NOT NULL, image VARCHAR(255) NOT NULL);',
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          connectionPool.query(
            'CREATE TABLE IF NOT EXISTS clowders (google_id VARCHAR(63) PRIMARY KEY, max_capacity SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0, signed_in_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, signed_up_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (google_id) REFERENCES users(google_id) ON UPDATE CASCADE ON DELETE CASCADE);',
            (err, result) => {
              if (err) {
                console.log(err)
              } else {
                connectionPool.query(
                  'CREATE TABLE IF NOT EXISTS clowdees (google_id VARCHAR(63) PRIMARY KEY, signed_in_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, signed_up_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (google_id) REFERENCES users(google_id) ON UPDATE CASCADE ON DELETE CASCADE);',
                  (err, result) => {
                    if (err) {
                      console.log(err)
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
  }

  // static createClowderDB() {
  //   console.log('clowder method called!')
  //
  //   connectionPool.query(
  //     'CREATE TABLE IF NOT EXISTS clowder (google_id VARCHAR(63) PRIMARY KEY, max_capacity SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0, signed_in_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, signed_up_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (google_id) REFERENCES user(google_id) ON UPDATE CASCADE ON DELETE CASCADE);',
  //     (err, result) => {
  //       if (err) console.log(err)
  //     }
  //   )
  // }
  //
  // static createClowdeeDB() {
  //   console.log('clowdee method called!')
  //   connectionPool.query(
  //     'CREATE TABLE IF NOT EXISTS clowdee (google_id VARCHAR(63) PRIMARY KEY, signed_in_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, signed_up_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (google_id) REFERENCES user(google_id) ON UPDATE CASCADE ON DELETE CASCADE);',
  //     (err, result) => {
  //       if (err) console.log(err)
  //     }
  //   )
  // }
}
