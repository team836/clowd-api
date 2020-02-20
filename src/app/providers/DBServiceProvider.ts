import mysql from 'mysql'

const connectionPool = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: parseInt(process.env.DB_port),
  password: process.env.DB_password,
  database: process.env.DB_database
})

export default connectionPool
