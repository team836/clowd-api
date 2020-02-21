import 'module-alias/register'
import dotenv from 'dotenv'
import RouteServiceProvider from '@/providers/RouteServiceProvider'
import { DBServiceProvider } from '@/providers/DBServiceProvider'

function bootApp(): void {
  const app = RouteServiceProvider.boot()
  DBServiceProvider.createUserDB()
  app.listen(process.env.APP_PORT)
}

dotenv.config()
bootApp()
