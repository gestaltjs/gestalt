import { createProjectLogger } from '../logger.js'
import { hyphenCased } from '@gestaltjs/core/common/string'
import { joinPath } from '@gestaltjs/core/node/path'
import { pathExists } from '@gestaltjs/core/node/fs'
import { ProjectDirectoryExistsError } from './init.errors.js'

export type InitServiceOptions = {
  /**
   * When true, the generated project should have its Gestalt dependencies
   * pointing to the packages in the repository.
   */
  local: boolean

  /**
   * The name of the project as it was passed by the user through flags or
   * the prompt.
   */
  name: string

  /**
   * The directory where the project's directory will get created.
   */
  directory: string

  /**
   * The package manager to use to install dependencies
   */
  packageManager?: string
}

export async function initService(options: InitServiceOptions) {
  const hyphenedProjectName = hyphenCased(options.name)
  const projectDirectory = joinPath(options.directory)
  await ensureProjectDirectoryAbsence(projectDirectory)
  createProjectLogger().info('it works!')
}

export async function ensureProjectDirectoryAbsence(directory: string) {
  if (await pathExists(directory)) {
    throw ProjectDirectoryExistsError(directory)
  }
}
