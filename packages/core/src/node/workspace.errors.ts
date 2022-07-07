import { Abort } from '../common/error.js'

/**
 * Returns an error to be thrown when the gestalt package directory can't be found.
 * @returns {Abort} An abort error.
 */
export const GestaltDirectoryNotFoundError = () => {
  return new Abort("Couldn't find the directory of the 'gestalt' package")
}
