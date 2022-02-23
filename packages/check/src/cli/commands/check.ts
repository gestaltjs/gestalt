import { Command } from '@oclif/core'
import logger from '../logger'

export default class Check extends Command {
  static description = 'Check your Gestalt application'

  async run(): Promise<void> {
    logger().success('Checked')
  }
}
