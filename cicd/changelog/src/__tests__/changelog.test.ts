import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import { DateTime } from 'luxon'

import changelog from '../changelog'

const repoPath = '/tmp/test-repo'
let commitDate: DateTime

jest.setTimeout(20000)

beforeAll(() => {
  shell.config.silent = process.env.VERBOSE === '0'
})

function makeCommit(
  version: string,
  message = `release: ${version}`,
  tag = `v${version}`,
  extraTag?: string,
  amend = false
): string {
  fs.writeFileSync(path.resolve(repoPath, 'VERSION'), version)
  commitDate = commitDate.plus({ day: 1 })
  const formattedCommitDate = commitDate.toFormat('ccc LLL  d H:m:s ZZZZ y')
  shell.exec(`git add .`)
  shell.exec(
    `GIT_COMMITTER_DATE="${formattedCommitDate}" git commit -m "${message}" --date "${formattedCommitDate}" ${
      amend ? '--amend' : ''
    }`
  )
  shell.exec(
    `GIT_COMMITTER_DATE="${formattedCommitDate}" git tag -a ${tag} -m "${tag}"`
  )
  if (extraTag) {
    ;`GIT_COMMITTER_DATE="${formattedCommitDate}" git tag -a ${extraTag} -m "${extraTag}"`
  }
  return shell.exec(`git show-ref -s ${tag}`).stdout
}

beforeEach(() => {
  commitDate = DateTime.utc(2021, 3, 31, 12)
  shell.mkdir(repoPath)
  shell.pushd('-q', repoPath)
  shell.exec('git init')
  shell.exec('git branch -m main')
  shell.exec('git config user.email "you@example.com"')
  shell.exec('git config user.name "Your Name"')

  makeCommit('', 'old history, not to include in changelog', 'history-0')

  makeCommit('0.1.0', undefined, undefined, undefined, true)
  makeCommit('0.2.0-dev.0', 'feature: Add Comments to Jenkinsfile')
  const v0_2_0_dev_1 = makeCommit('0.2.0-dev.1', 'feature: Git Workflow')
  makeCommit('0.2.0-rc.0')
  makeCommit(
    '0.2.0-rc.1',
    'bugfix: Remove Unfished Package Support from README.md'
  )
  const v0_2_0 = makeCommit('0.2.0')
  const v0_2_1 = makeCommit(
    '0.2.1',
    'release: 0.2.1\n\nhotfix: Missing Git Workflow Heading'
  )
  makeCommit(
    '0.2.2',
    'release: 0.2.2\n\nhotfix: Bump Jenkins Plugin Git to 4.7.1 and include BlueOcean transitive dependencies to pin Git version'
  )
  const v0_2_3 = makeCommit(
    '0.2.3',
    'release: 0.2.3\n\nhotfix: Bump Jenkins LTS Version to 2.277.3'
  )

  shell.exec(`git checkout -b develop ${v0_2_0_dev_1}`)
  makeCommit('0.2.0-dev.2', 'feature: Add Nexus Service')
  shell.exec(`git merge ${v0_2_0}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  makeCommit('0.3.0-dev.0', "Merge branch 'develop' into release/0.2")
  shell.exec(`git merge ${v0_2_1}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  makeCommit('0.3.0-dev.1', "Merge branch 'develop' into hotfix/0.2.1")
  makeCommit('0.3.0-dev.2', 'feature: Local Jenkins Github')
  shell.exec(`git merge ${v0_2_3}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  makeCommit(
    '0.3.0-dev.3',
    "Merge branch 'develop' into hotfix/jenkins-plugin-git-4.7.1"
  )
  makeCommit('0.3.0-dev.4', 'feature: Update GitHub Repository Name')
  makeCommit('0.3.0-dev.5', 'feature: Docker Compose support in CI')
  const v0_3_0_dev_6 = makeCommit(
    '0.3.0-dev.6',
    'feature: Static Pipeline Generation'
  )

  shell.exec(`git checkout main`)
  shell.exec(`git merge ${v0_3_0_dev_6}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  shell.exec(`git branch -D develop`)

  const v0_3_0_dev_7 = makeCommit(
    '0.3.0-dev.7',
    "Merge branch 'develop' into hotfix/bump-jenkins-to-latest-lts"
  )
  makeCommit('0.3.0-rc.0')
  makeCommit(
    '0.3.0-rc.1',
    'bugfix: Bind to debugging port when running debug-test target, fixes running multiple builds in parallel'
  )
  const v0_3_0 = makeCommit('0.3.0', undefined, undefined, 'test-tag')
  const v0_3_1 = makeCommit(
    '0.3.1',
    'release: 0.3.1\n\nhotfix: Fix Jenkins Plugin Dependencies by pinning all plugin versions'
  )
  const v0_3_2 = makeCommit(
    '0.3.2',
    'release: 0.3.2\n\nhotfix: Fix Jenkins Plugin Installer always downloading the latest plugin versions, that conflict with plugins.txt'
  )

  shell.exec(`git checkout -b develop ${v0_3_0_dev_7}`)
  makeCommit('0.4.0-dev.0')
  shell.exec(`git merge ${v0_3_0}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  makeCommit('0.4.0-dev.1', "Merge branch 'develop' into release/0.3")
  shell.exec(`git merge ${v0_3_1}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  shell.exec(`git merge ${v0_3_2}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  const v0_4_0_dev_2 = makeCommit(
    '0.4.0-dev.2',
    "Merge branch 'develop' into hotfix/fix-jenkins-plugin-dependencies"
  )

  shell.exec(`git checkout main`)
  shell.exec(`git merge ${v0_4_0_dev_2}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  shell.exec(`git branch -D develop`)

  makeCommit(
    '0.4.0-dev.3',
    "Merge branch 'develop' into hotfix/fix-jenkins-plugin-installer-always-downloading-the-latest-plugin-versions"
  )
  makeCommit(
    '0.4.0-dev.4',
    'feature: Remove now unused jqrapht custom Jenkins Plugin'
  )
  makeCommit('0.4.0-dev.5', 'feature: Add Jenkins Docker Image Build to CI')
  makeCommit(
    '0.4.0-dev.6',
    'feature: Provision Nexus 3 with Users and Repositories'
  )
  const v0_4_0_dev_7 = makeCommit(
    '0.4.0-dev.7',
    'feature: HTTPS Ingress for Jenkins, Nexus and Docker Repository'
  )
  makeCommit('0.4.0-rc.0')
  makeCommit('0.4.0')

  shell.exec(`git checkout -b develop ${v0_4_0_dev_7}`)
  const v0_5_0_dev_0 = makeCommit('0.5.0-dev.0')

  shell.exec(`git checkout main`)
  shell.exec(`git merge ${v0_5_0_dev_0}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  shell.exec(`git branch -D develop`)

  makeCommit('0.5.0-dev.1', "Merge branch 'develop' into release/0.4")
  makeCommit('0.5.0-dev.2', 'Push CICD Images to Nexus')
  makeCommit('0.5.0-dev.3', 'Add newline to VERSION')
  makeCommit(
    '0.5.0-dev.4',
    'feature: Optimise build-pipeline-generator by ignoring node_modules directories'
  )
  makeCommit(
    '0.5.0-dev.5',
    'feature: Validate Component and Repoistory VERSION'
  )
  makeCommit(
    '0.5.0-dev.6',
    'feature: Fix Validate Version tool to work on develop, main and release branches'
  )
  makeCommit(
    '0.5.0-dev.7',
    'feature: Optimise Build Pipeline Generator build time'
  )
  makeCommit('0.5.0-dev.8', 'feature: Shallow Builds for Jenkins Component')
  const v0_5_0_dev_9 = makeCommit(
    '0.5.0-dev.9',
    'feature: Shallow Builds for Nexus Provision Component'
  )
  makeCommit('0.5.0-rc.0')
  makeCommit(
    '0.5.0-rc.1',
    'bugfix: Sync npm package.json version and docker tags with Component VERSION'
  )
  makeCommit('0.5.0')

  shell.exec(`git checkout -b develop ${v0_5_0_dev_9}`)
  const v0_6_0_dev_0 = makeCommit('0.6.0-dev.0')

  shell.exec(`git checkout main`)
  shell.exec(`git merge ${v0_6_0_dev_0}`)
  shell.exec(`git checkout --ours ${path.resolve(repoPath, 'VERSION')}`)
  shell.exec(`git branch -D develop`)

  makeCommit('0.6.0-dev.1', "Merge branch 'develop' into release/0.5")
  makeCommit(
    '0.6.0-dev.2',
    'feature: build-pipeline-generator now validates Jenkinsfile files with Jenkins'
  )
  makeCommit('0.6.0-dev.3', 'feature: Validate Jenkinsfile Template')
})

afterEach(() => {
  shell.popd()
  shell.rm('-fr', repoPath)
})

test('update existing changelog', async () => {
  shell.cp(
    path.resolve(__dirname, '__fixtures__/existing-CHANGELOG.md'),
    path.resolve(repoPath, 'CHANGELOG.md')
  )

  await changelog()

  expect(shell.cat('./CHANGELOG.md').stdout).toMatchInlineSnapshot(`
"# Changelog

## [Unreleased]
### Features
 - Validate Jenkinsfile Template
 - build-pipeline-generator now validates Jenkinsfile files with Jenkins ([c0674edf])

## [v0.5.0] - 2021-05-17
### Bug Fixes
 - Sync npm package.json version and docker tags with Component VERSION ([5282d5d9])
### Features
 - Shallow Builds for Nexus Provision Component ([c23bc479])
 - Shallow Builds for Jenkins Component ([d2b5b6ad])
 - Optimise Build Pipeline Generator build time ([4c997b69])
 - Fix Validate Version tool to work on develop, main and release branches ([676811b1])
 - Validate Component and Repository VERSION ([142b1087])
 - Optimise build-pipeline-generator by ignoring node_modules directories ([bf5979eb])
 - Add newline to VERSION ([e7e9aefb])
 - Push CI/CD Images to Nexus ([e8744afc])

## [v0.4.0] - 2021-05-04
### Features
 - HTTPS Ingress for Jenkins, Nexus and Docker Repository ([21b4d52d])
 - Provision Nexus 3 with Users and Repositories ([d654dc53])
 - Add Jenkins Docker Image Build to CI ([35be7261])
 - Remove now unused jGraphT custom Jenkins Plugin ([bdd8f433])

## [v0.3.2] - 2021-04-24
### Bug Fixes
 - Fix Jenkins Plugin Installer always downloading the latest plugin versions, that conflict with plugins.txt ([6ee29152])

## [v0.3.1] - 2021-04-23
### Bug Fixes
 - Fix Jenkins Plugin Dependencies by pinning all plugin versions ([07ebadf8])

## [v0.3.0] - 2021-04-22
### Bug Fixes
 - Bind to debugging port when running debug-test target, fixes running multiple builds in parallel ([253ae224])
### Features
 - Static Pipeline Generation ([b4de72ac])
 - Docker Compose support in CI ([6106e8bd])
 - Update GitHub Repository Name ([c90f57c3])
 - Local Jenkins Github ([fa48b918])
 - Add Nexus Service ([b264daad])

## [v0.2.3] - 2021-04-10
### Bug Fixes
 - Bump Jenkins LTS Version to 2.277.3 ([29bc7225])

## [v0.2.2] - 2021-04-09
### Bug Fixes
 - Bump Jenkins Plugin Git to 4.7.1 and include BlueOcean transitive dependencies to pin Git version ([26d0da4a])

## [v0.2.1] - 2021-04-08
### Bug Fixes
 - Missing Git Workflow Heading ([fdd7d0ad])

## [v0.2.0] - 2021-04-07
### Bug Fixes
 - Remove Unfinished Package Support from README.md ([61052825])
### Features
 - Git Workflow ([cf50285e])
 - Add Comments to Jenkinsfile ([81df9ee1])

[Unreleased]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.5.0...HEAD

[c0674edf]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c0674edf6cc1684d3aa82aa430b2e2b1ab9c32a9
[v0.5.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.4.0...v0.5.0
[c23bc479]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c23bc479cd51deb86c57e0f6372e82963c8f68e0
[d2b5b6ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d2b5b6ad48a4505d66287c0696302e864fa7d438
[4c997b69]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/4c997b69b230f3931bf67d553b3eb026e3895287
[676811b1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/676811b183ffe8128cdf7a0ddf4ce65b5f674225
[142b1087]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/142b1087446c954966590766bb3974c406c0e104
[bf5979eb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bf5979eb823c0c6b458550420d33e6d20ff97139
[e7e9aefb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e7e9aefb2b05475ca63c42d43f6d4dc1ed462ff1
[e8744afc]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e8744afcdc25a5eade7f0be534dd5dd9638b0861
[5282d5d9]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/5282d5d9dd97841ea79b6a5fb77bfdbb1b5ac30e
[v0.4.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.2...v0.4.0
[21b4d52d]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/21b4d52d7fc227f3c9c0e8a0114766cf6b18f2ea
[d654dc53]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d654dc53a7fdcb97959374f457a6fdfea1c36ebc
[35be7261]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/35be726164a59bc5da7c487b91996154a65dfb9d
[bdd8f433]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bdd8f433f93b43f820ab9c47101382f0bc362337
[v0.3.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.1...v0.3.2
[6ee29152]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6ee291521c761be774a4f4c62d5b8e2c3d1e1195
[v0.3.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.0...v0.3.1
[07ebadf8]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/07ebadf83535dcbc16a125158b9f06b6447d772f
[v0.3.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.3...v0.3.0
[b4de72ac]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b4de72acf51ea020ad59d47e8eb27cd5123b4992
[6106e8bd]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6106e8bd8d936aff9f50e236eba8e0b513ab005e
[c90f57c3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c90f57c325fc57949b796eadfe4a8c0f056ce353
[fa48b918]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fa48b9180c9b4050be86e15b54cc87a6c7899bcd
[b264daad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b264daadfcd9558d83f0b6555921a13b45afb9ee
[253ae224]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/253ae224931cce9b5dd951f74ab1360946d12f73
[v0.2.3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.2...v0.2.3
[29bc7225]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/29bc72256ae915eae769fe0b04c84dc7b85baeb0
[v0.2.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.1...v0.2.2
[26d0da4a]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/26d0da4a122cd6e575a00eda1fb4be5d17554d2a
[v0.2.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.0...v0.2.1
[fdd7d0ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fdd7d0adefea7c8a0e2fd762419fba7434412636
[v0.2.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.1.0...v0.2.0
[cf50285e]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/cf50285e13b64c3a1269a4b986f72279c7b872b0
[81df9ee1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/81df9ee1ac89226ccce8f0272c95ad87becef77e
[61052825]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/61052825e4345195654f0f7edc2b4746fd7b9e01"
`)
})

test('create changelog if one does not already exist', async () => {
  await changelog()

  expect(shell.cat('./CHANGELOG.md').stdout).toMatchInlineSnapshot(`
"# Changelog

## [Unreleased]
### Features
 - Validate Jenkinsfile Template
 - build-pipeline-generator now validates Jenkinsfile files with Jenkins ([c0674edf])

## [v0.5.0] - 2021-05-17
### Bug Fixes
 - Sync npm package.json version and docker tags with Component VERSION ([5282d5d9])
### Features
 - Shallow Builds for Nexus Provision Component ([c23bc479])
 - Shallow Builds for Jenkins Component ([d2b5b6ad])
 - Optimise Build Pipeline Generator build time ([4c997b69])
 - Fix Validate Version tool to work on develop, main and release branches ([676811b1])
 - Validate Component and Repoistory VERSION ([142b1087])
 - Optimise build-pipeline-generator by ignoring node_modules directories ([bf5979eb])
 - Add newline to VERSION ([e7e9aefb])
 - Push CICD Images to Nexus ([e8744afc])

## [v0.4.0] - 2021-05-04
### Features
 - HTTPS Ingress for Jenkins, Nexus and Docker Repository ([21b4d52d])
 - Provision Nexus 3 with Users and Repositories ([d654dc53])
 - Add Jenkins Docker Image Build to CI ([35be7261])
 - Remove now unused jqrapht custom Jenkins Plugin ([bdd8f433])

## [v0.3.2] - 2021-04-24
### Bug Fixes
 - Fix Jenkins Plugin Installer always downloading the latest plugin versions, that conflict with plugins.txt ([6ee29152])

## [v0.3.1] - 2021-04-23
### Bug Fixes
 - Fix Jenkins Plugin Dependencies by pinning all plugin versions ([07ebadf8])

## [v0.3.0] - 2021-04-22
### Bug Fixes
 - Bind to debugging port when running debug-test target, fixes running multiple builds in parallel ([253ae224])
### Features
 - Static Pipeline Generation ([b4de72ac])
 - Docker Compose support in CI ([6106e8bd])
 - Update GitHub Repository Name ([c90f57c3])
 - Local Jenkins Github ([fa48b918])
 - Add Nexus Service ([b264daad])

## [v0.2.3] - 2021-04-10
### Bug Fixes
 - Bump Jenkins LTS Version to 2.277.3 ([29bc7225])

## [v0.2.2] - 2021-04-09
### Bug Fixes
 - Bump Jenkins Plugin Git to 4.7.1 and include BlueOcean transitive dependencies to pin Git version ([26d0da4a])

## [v0.2.1] - 2021-04-08
### Bug Fixes
 - Missing Git Workflow Heading ([fdd7d0ad])

## [v0.2.0] - 2021-04-07
### Bug Fixes
 - Remove Unfished Package Support from README.md ([61052825])
### Features
 - Git Workflow ([cf50285e])
 - Add Comments to Jenkinsfile ([81df9ee1])

[Unreleased]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.5.0...HEAD

[c0674edf]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c0674edf6cc1684d3aa82aa430b2e2b1ab9c32a9
[v0.5.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.4.0...v0.5.0
[c23bc479]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c23bc479cd51deb86c57e0f6372e82963c8f68e0
[d2b5b6ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d2b5b6ad48a4505d66287c0696302e864fa7d438
[4c997b69]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/4c997b69b230f3931bf67d553b3eb026e3895287
[676811b1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/676811b183ffe8128cdf7a0ddf4ce65b5f674225
[142b1087]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/142b1087446c954966590766bb3974c406c0e104
[bf5979eb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bf5979eb823c0c6b458550420d33e6d20ff97139
[e7e9aefb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e7e9aefb2b05475ca63c42d43f6d4dc1ed462ff1
[e8744afc]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e8744afcdc25a5eade7f0be534dd5dd9638b0861
[5282d5d9]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/5282d5d9dd97841ea79b6a5fb77bfdbb1b5ac30e
[v0.4.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.2...v0.4.0
[21b4d52d]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/21b4d52d7fc227f3c9c0e8a0114766cf6b18f2ea
[d654dc53]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d654dc53a7fdcb97959374f457a6fdfea1c36ebc
[35be7261]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/35be726164a59bc5da7c487b91996154a65dfb9d
[bdd8f433]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bdd8f433f93b43f820ab9c47101382f0bc362337
[v0.3.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.1...v0.3.2
[6ee29152]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6ee291521c761be774a4f4c62d5b8e2c3d1e1195
[v0.3.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.0...v0.3.1
[07ebadf8]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/07ebadf83535dcbc16a125158b9f06b6447d772f
[v0.3.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.3...v0.3.0
[b4de72ac]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b4de72acf51ea020ad59d47e8eb27cd5123b4992
[6106e8bd]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6106e8bd8d936aff9f50e236eba8e0b513ab005e
[c90f57c3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c90f57c325fc57949b796eadfe4a8c0f056ce353
[fa48b918]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fa48b9180c9b4050be86e15b54cc87a6c7899bcd
[b264daad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b264daadfcd9558d83f0b6555921a13b45afb9ee
[253ae224]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/253ae224931cce9b5dd951f74ab1360946d12f73
[v0.2.3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.2...v0.2.3
[29bc7225]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/29bc72256ae915eae769fe0b04c84dc7b85baeb0
[v0.2.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.1...v0.2.2
[26d0da4a]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/26d0da4a122cd6e575a00eda1fb4be5d17554d2a
[v0.2.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.0...v0.2.1
[fdd7d0ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fdd7d0adefea7c8a0e2fd762419fba7434412636
[v0.2.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.1.0...v0.2.0
[cf50285e]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/cf50285e13b64c3a1269a4b986f72279c7b872b0
[81df9ee1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/81df9ee1ac89226ccce8f0272c95ad87becef77e
[61052825]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/61052825e4345195654f0f7edc2b4746fd7b9e01"
`)
})
