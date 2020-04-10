import express from 'express'

export type FreekConfig = {
  port?: number,
}

const DEFAULT_PORT = 3000

export class Freek {
  private static bootstrapped: boolean = false

  public static async bootstrap (config: FreekConfig): Promise<void> {
    if (this.bootstrapped) {
      throw new Error('Freek.bootstrap() has already been called!')
    }

    const port = config.port ?? DEFAULT_PORT
    const app = express()

    return new Promise<void>(resolve => {
      app.listen(port, () => resolve())
    })
  }
}
