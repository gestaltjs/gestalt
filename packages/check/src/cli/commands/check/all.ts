import { Flags, Interfaces } from '@oclif/core'
import { project, Command } from '@gestaltjs/core/cli'
import { checkCode } from '../../services/code'
import { checkStyle } from '../../services/styles'

// eslint-disable-next-line import/no-default-export
export default class All extends Command {
  static description = 'Check code and style.'

  static flags: Interfaces.FlagInput<any> = {
    ...Command.flags,
    path: Flags.string({
      char: 'p',
      description:
        'The path to the directory containing the Gestalt project. Defaults to current working directory.',
      hidden: false,
      multiple: false,
      env: 'GESTALT_PATH',
      default: process.cwd(),
      required: false,
    }),
    fix: Flags.boolean({
      char: 'f',
      description: 'When passed, it fixes the fixable style issues.',
      default: false,
      required: false,
      env: 'GESTALT_FIX',
    }),
  }
  async run(): Promise<void> {
    const { flags } = await this.parse(All)
    const loadedProject = await project.load(flags.path)

    await checkCode(loadedProject.directory)
    await checkStyle({
      fix: flags.fix,
      project: loadedProject,
    })
  }
}
