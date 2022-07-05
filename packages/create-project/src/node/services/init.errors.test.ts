import { unstyled } from '@gestaltjs/core/node/terminal'
import { test, describe, expect } from 'vitest'
import { ProjectDirectoryExistsError } from './init.errors'

describe('ProjectDirectoryExistsError', () => {
  test('has the right message', () => {
    // Given
    const error = ProjectDirectoryExistsError('/test/project')

    // Then
    expect(unstyled(error.message)).toMatchInlineSnapshot('"The directory /test/project already exists."')
  })
})
