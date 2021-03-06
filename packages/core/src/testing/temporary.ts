import tempy from 'tempy'
import rimraf from 'rimraf'

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporarydirectory<T>(
  callback: (temporaryDirectory: string) => T
) {
  return tempy.directory.task(callback)
}

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function inTemporaryDeletableDirectory<T>(
  callback: (temporaryDirectory: string, deleteDir: () => Promise<void>) => T
) {
  const directory = tempy.directory()
  const value = callback(directory, async () => {
    await new Promise((resolve, reject) => {
      rimraf(directory, {}, resolve)
    })
  })
  return value
}
