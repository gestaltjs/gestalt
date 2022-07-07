import { describe, expect, test } from 'vitest'
import { gestaltjsPackageDirectory } from './workspace.js'

describe('gestaltjsPackageDirectory', () => {
  test('it finds the directory', async () => {
    // Given/When
    const got = await gestaltjsPackageDirectory()

    // Then
    expect(got).not.toBeUndefined()
  })
})
