import fs from 'fs'
import glob from 'glob'
import { tmpdir } from 'os'
import path from 'path'

test('Generates Jenkinsfile', async () => {
  const tempDir = fs.mkdtempSync(`${tmpdir}${path.sep}`)
  const jenkinsfilePath = path.resolve(tempDir, 'Jenkinsfile')

  process.argv = ['node', 'jest', '-o', jenkinsfilePath]

  require('../index')

  expect(glob.sync('Jenkinsfile', { cwd: tempDir }).length).toBe(1)
  fs.rmSync(jenkinsfilePath)
})
