import { Express } from 'express'
import Freek, { FreekConfig } from './freek'

let SINGLETON: Freek | null = null

function createSingleton (config: FreekConfig): void {
  SINGLETON = SINGLETON ?? new Freek(config)
}

function getSingleton (): Freek {
  if (!SINGLETON) {
    throw new Error('You need to call .bootstrap() first!')
  }

  return SINGLETON
}

// NOTE: simple singleton wrapper
const FreekSingleton = {
  bootstrap (config: FreekConfig): Promise<void> {
    createSingleton(config)

    return getSingleton().bootstrap()
  },
  getServer (): Express {
    return getSingleton().getServer()
  },
}

export { FreekSingleton as Freek }
