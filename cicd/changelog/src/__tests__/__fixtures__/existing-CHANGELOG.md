# Changelog

## [Unreleased]
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

[Unreleased]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.4.0...HEAD
[c23bc479]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c23bc479cd51deb86c57e0f6372e82963c8f68e0
[d2b5b6ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d2b5b6ad48a4505d66287c0696302e864fa7d438
[4c997b69]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/4c997b69b230f3931bf67d553b3eb026e3895287
[676811b1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/676811b183ffe8128cdf7a0ddf4ce65b5f674225
[142b1087]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/142b1087446c954966590766bb3974c406c0e104
[bf5979eb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bf5979eb823c0c6b458550420d33e6d20ff97139
[e7e9aefb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e7e9aefb2b05475ca63c42d43f6d4dc1ed462ff1
[e8744afc]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e8744afcdc25a5eade7f0be534dd5dd9638b0861
[98be76fa]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/98be76fa6bcc7ab63148f65f77e4a51543f42f6e
[v0.4.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.2...v0.4.0
[4bd4b17b]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/4bd4b17bfcd9524e768cb2d5737c85a806cdacd6
[dd9598e8]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/dd9598e833763a922028dde741702adb2c828434
[21b4d52d]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/21b4d52d7fc227f3c9c0e8a0114766cf6b18f2ea
[d654dc53]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/d654dc53a7fdcb97959374f457a6fdfea1c36ebc
[35be7261]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/35be726164a59bc5da7c487b91996154a65dfb9d
[bdd8f433]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/bdd8f433f93b43f820ab9c47101382f0bc362337
[0512a8f1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/0512a8f1b77d9abaf08f2c7d9e3eb3557773b8e7
[v0.3.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.1...v0.3.2
[6ee29152]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6ee291521c761be774a4f4c62d5b8e2c3d1e1195
[v0.3.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.0...v0.3.1
[07ebadf8]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/07ebadf83535dcbc16a125158b9f06b6447d772f
[v0.3.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.3...v0.3.0
[72866bba]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/72866bba309c16927efecf8b3a54b65efd37bee7
[253ae224]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/253ae224931cce9b5dd951f74ab1360946d12f73
[3c8213f7]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/3c8213f76e3f6adfc56ace7bb4917be3653f6935
[b4de72ac]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b4de72acf51ea020ad59d47e8eb27cd5123b4992
[6106e8bd]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6106e8bd8d936aff9f50e236eba8e0b513ab005e
[c90f57c3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c90f57c325fc57949b796eadfe4a8c0f056ce353
[fa48b918]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fa48b9180c9b4050be86e15b54cc87a6c7899bcd
[b264daad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b264daadfcd9558d83f0b6555921a13b45afb9ee
[v0.2.3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.2...v0.2.3
[29bc7225]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/29bc72256ae915eae769fe0b04c84dc7b85baeb0
[v0.2.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.1...v0.2.2
[26d0da4a]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/26d0da4a122cd6e575a00eda1fb4be5d17554d2a
[v0.2.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.0...v0.2.1
[fdd7d0ad]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fdd7d0adefea7c8a0e2fd762419fba7434412636
[v0.2.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.1.0...v0.2.0
[cefd5e7b]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/cefd5e7b9aa482234c0b2fe9334164861ae06b27
[61052825]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/61052825e4345195654f0f7edc2b4746fd7b9e01
[e375a285]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e375a285eb2ab8589a5b1bb58d1f0f2371c18a89
[cf50285e]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/cf50285e13b64c3a1269a4b986f72279c7b872b0
[81df9ee1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/81df9ee1ac89226ccce8f0272c95ad87becef77e
