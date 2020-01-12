require('dotenv').config()

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: './build/src/main.js',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['build'],
      max_memory_restart: '4G'
    }
  ]
}
