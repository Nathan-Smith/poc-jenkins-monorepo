import { DirectoryJSON } from 'memfs'
import { basename } from 'path'

/**
 * Create a mock component, use this with mock-fs
 * @param path Component Name
 * @param deps Optional, defaults to []. List of Component Dependencies
 * @param Jenkinsfile Optional, defaults to valid Jenkinsfile. Custom Jenkinsfile
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
  deps: string[] = [],
  Jenkinsfile = `stage('${basename(
    path
  )}') { steps { sh 'echo "Hello World"' } }`
): DirectoryJSON {
  return {
    [`${path}/Jenkinsfile`]: Jenkinsfile,
    [`${path}/VERSION`]: '0.1.0\n',
    ...(deps.length > 0
      ? {
          [`${path}/deps`]: deps.join('\n'),
        }
      : {}),
  }
}
