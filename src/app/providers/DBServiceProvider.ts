import mysql from 'mysql'

const connectionPool = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: parseInt(process.env.DB_port),
  password: process.env.DB_password,
  database: process.env.DB_database
})

// connectionPool.getConnection((err, connection) => {
//   if (err) {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('Database connection was closed')
//     }
//     if (err.code === 'ER_CON_COUNT_ERROR') {
//       console.error('Database has too many connections')
//     }
//     if (err.code === 'ECONNREFUSED') {
//       console.error('Database connection was refused')
//     }
//   }
//
//   connection.release()
// })

export default connectionPool
