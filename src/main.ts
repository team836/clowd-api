import 'module-alias/register'
import dotenv from 'dotenv'
import RouteServiceProvider from '@/providers/RouteServiceProvider'

function bootApp(): void {
  const app = RouteServiceProvider.boot()
  app.listen(process.env.APP_PORT)
}

dotenv.config()
bootApp()
