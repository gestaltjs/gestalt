import { createProjectLogger } from '../logger.js'

export type InitServiceOptions = {
  local: boolean
  name: string
  path: string
  packageManager?: string
}

export async function initService(options: InitServiceOptions) {
  createProjectLogger().info('it works!')
}
