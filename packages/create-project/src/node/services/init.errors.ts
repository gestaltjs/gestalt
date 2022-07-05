import { Abort } from '@gestaltjs/core/common/error'
import { content, pathToken } from '@gestaltjs/core/node/logger'

/**
 * An abort error that's thrown when the user tries to create a project and the directory
 * already exists.
 * @param directory {directory} The absolute path to the already-existing directory.
 * @returns {Abort} An abort error.
 */
export const ProjectDirectoryExistsError = (directory: string) => {
  return new Abort(
    content`The directory ${pathToken(directory)} already exists.`
  )
}
