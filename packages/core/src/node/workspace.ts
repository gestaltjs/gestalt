import { findPathUp } from './fs.js'
import { moduleDirname } from './path.js'
import { GestaltDirectoryNotFoundError } from './workspace.errors.js'

/**
 * This function returns the directory containing the gestalt package.
 * NOTE: The function is intended for development and testing purposes
 * and should not be used in production workflows by no circumstances.
 * @returns {Promise<string>} A promise that resolves with the directory.
 * @throws {GestaltDirectoryNotFoundError} When the directory can't be found.
 */
export async function gestaltjsPackageDirectory(): Promise<string> {
  const directory = await findPathUp('packages/gestaltjs', {
    type: 'directory',
    cwd: moduleDirname(import.meta.url),
  })
  if (!directory) {
    throw GestaltDirectoryNotFoundError()
  }
  return directory
}
