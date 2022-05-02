// eslint-disable-next-line @typescript-eslint/no-var-requires
const execa = require('execa')
import colors from 'picocolors'

import { isDebug } from './environment'

/**
 * It provides a promise-based interface for running system processes.
 * The implementation forwards the standard
 * output and error if the variable DEBUG=1 is set when running acceptance
 * tests.
 * @param command The command to be executed.
 * @returns A promise that resolves or rejects when the command execution finishes.
 */
export function exec(
  command: string,
  args: string[] = [],
  options?: { cwd?: string; env?: NodeJS.ProcessEnv }
) {
  if (isDebug) {
    // eslint-disable-next-line no-console
    console.log(colors.gray(`Running: ${command} ${args.join(' ')}`))
  }

  const _options: any = { ...options, stdout: undefined, stderr: undefined }
  const shortCommand = command.split('/').slice(-1).pop() || ''
  const commandProcess = execa(command, args, _options)
  commandProcess.stdout?.on('data', (data: string) => {
    if (isDebug) {
      // eslint-disable-next-line no-console
      console.log(colors.gray(`${colors.bold(shortCommand)}: ${data}`))
    }
  })
  commandProcess.stderr?.on('data', (data: string) => {
    if (isDebug) {
      // eslint-disable-next-line no-console
      console.log(colors.gray(`${colors.bold(shortCommand)}: ${data}`))
    }
  })
  return commandProcess
}
