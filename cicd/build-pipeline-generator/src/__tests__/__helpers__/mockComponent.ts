import FileSystem from 'mock-fs/lib/filesystem'
import { basename } from 'path'

/**
 * Create a mock component, use this with mock-fs
 * @param path Component Name
 * @param deps List of Component Dependencies
 * @returns Directory containing a Jenkinsfile and optionally a deps file
 * @example
 * ```
  mockFs({
    ...mockComponent('app1', 'lib1', 'lib2),
  })
 * ```
 */
export function mockComponent(
  path: string,
  ...deps: string[]
): FileSystem.DirectoryItems {
  return {
    [path]: {
      Jenkinsfile: `stage('${basename(path)}') {}`,
      VERSION: '0.1.0\n',
      ...(deps.length > 0
        ? {
            deps: deps.join('\n'),
          }
        : {}),
    },
  }
}
