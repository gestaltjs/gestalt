import { GestaltCommand } from '@gestaltjs/core/node/command'
import { Flags } from '@oclif/core'
import { resolvePath } from '@gestaltjs/core/node/path'
import { initPrompt } from '../prompts/init.js'
import { initService } from '../services/init.js'

// eslint-disable-next-line import/no-default-export
export default class Init extends GestaltCommand {
  static description = 'Create a Gestalt project'

  static flags = {
    ...GestaltCommand.flags,
    local: Flags.boolean({
      name: 'local',
      char: 'l',
      env: 'GESTALT_LOCAL',
      description:
        'Intended for development to point to the local CLI repository',
      required: false,
      default: false,
    }),
    name: Flags.string({
      name: 'name',
      char: 'n',
      env: 'GESTALT_NAME',
      description: 'The name of the project',
      required: false,
    }),
    path: Flags.string({
      name: 'path',
      char: 'p',
      env: 'GESTALT_PATH',
      default: process.cwd(),
      parse: async (input) => resolvePath(input),
      description:
        "The path to the directory that where the project's directory will be created",
      required: false,
    }),
    'package-manager': Flags.string({
      name: 'package-manager',
      char: 'd',
      env: 'GESTALT_PACKAGE_MANAGER',
      description:
        'The package manager to use. It defaults to the one used to run create-x and fallbacks to npm.',
      options: ['npm', 'yarn', 'pnpm'],
      required: false,
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Init)
    const options = { ...flags, ...(await initPrompt(flags)) }
    await initService({
      ...options,
      directory: options.path,
    })
  }
}
