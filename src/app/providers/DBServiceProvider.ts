import DBConnector from '@/modules/DBConnector'

export default class DBServiceProvider {
  public static async boot(): Promise<void> {
    await DBConnector.Instance.connect()
  }
}
