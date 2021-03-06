import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../testing/temporary.js'
import { ScaffoldOptions, scaffold } from './template.js'
import { joinPath } from './path.js'
import { writeFile, pathExists, readFile, makeDirectory } from './fs.js'

describe('scaffold basic file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, 'target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const fileName = 'hello-world.txt'
      const sourceFile = joinPath(sourceDirectory, fileName)
      await makeDirectory(sourceDirectory)
      await writeFile(sourceFile, '')
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      const targetFile = joinPath(targetDirectory, fileName)
      await expect(pathExists(targetFile))
    })
  })
})

describe('scaffold handlebar file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, '{{name}}')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const sourceFileName = '{{name}}.txt.hbs'
      const sourceFile = joinPath(sourceDirectory, sourceFileName)
      const sourceContent = '{{name}}'
      await makeDirectory(sourceDirectory)
      await writeFile(sourceFile, sourceContent)
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      await expect(pathExists(targetDirectory))
      const expectedFile = joinPath(
        tmpDir,
        'my-cool-project/my-cool-project.txt'
      )
      await expect(pathExists(expectedFile))
      const expectedContent = 'my-cool-project'
      const targetContent = await readFile(expectedFile)
      await expect(targetContent).toEqual(expectedContent)
    })
  })
})
