import 'module-alias/register'
import dotenv from 'dotenv'
import RouteServiceProvider from '@/providers/RouteServiceProvider'
import DBServiceProvider from '@/providers/DBServiceProvider'

async function bootApp(): Promise<void> {
  await DBServiceProvider.boot()
  const app = RouteServiceProvider.boot()
  app.listen(process.env.APP_PORT)
}

dotenv.config()
bootApp().then()
