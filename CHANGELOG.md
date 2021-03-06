# Changelog

## [v0.6.0] - 2021-07-31
### Bug Fixes
 - CHANGELOG including release commits in link list ([e8eaa613])
 - package.json version and CHANGELOG ([3b00278c])
### Features
 - Update npm to 7.20.0 ([9dd0b8cc])
 - Update Jenkins to 2.289.2 ([25802d65])
 - Run Lint on Dockerfiles ([2d971dc0])
 - Generate CHANGELOG.md from Git following Conventional Commits ([08e94856])
 - Validate Jenkinsfile Template ([54e7664b])
 - build-pipeline-generator now validates Jenkinsfile files with Jenkins ([a4e42866])

## [v0.5.0] - 2021-06-30
### Bug Fixes
 - Sync npm package.json version and docker tags with Component VERSION ([286fc7ac])
### Features
 - Shallow Builds for Nexus Provision Component ([6cef837f])
 - Shallow Builds for Jenkins Component ([7a49215c])
 - Optimise Build Pipeline Generator build time ([df2553d5])
 - Fix Validate Version tool to work on develop, main and release branches ([90109eae])
 - Validate Component and Repository VERSION ([795119b0])
 - Optimise build-pipeline-generator by ignoring node_modules directories ([897bea1f])
 - Add newline to VERSION ([0f6f8292])
 - Push CI/CD Images to Nexus ([7e6cfa56])

## [v0.4.0] - 2021-05-29
### Features
 - HTTPS Ingress for Jenkins, Nexus and Docker Repository ([32e92cc2])
 - Provision Nexus 3 with Users and Repositories ([c18f2a79])
 - Add Jenkins Docker Image Build to CI ([c8ea5853])
 - Remove now unused jGraphT custom Jenkins Plugin ([e8e393da])

## [v0.3.2] - 2021-05-04
### Bug Fixes
 - Fix Jenkins Plugin Installer always downloading the latest plugin versions, that conflict with plugins.txt ([43966027])

## [v0.3.1] - 2021-05-04
### Bug Fixes
 - Fix Jenkins Plugin Dependencies by pinning all plugin versions ([8f36ff0f])

## [v0.3.0] - 2021-04-23
### Bug Fixes
 - Bind to debugging port when running debug-test target, fixes running multiple builds in parallel ([a4a626fb])
### Features
 - Static Pipeline Generation ([2e91bf85])
 - Docker Compose support in CI ([b3297338])
 - Update GitHub Repository Name ([065c6128])
 - Local Jenkins Github ([750178ac])
 - Add Nexus Service ([75447e97])

## [v0.2.3] - 2021-04-23
### Bug Fixes
 - Bump Jenkins LTS Version to 2.277.3 ([7f47d72d])

## [v0.2.2] - 2021-04-06
### Bug Fixes
 - Bump Jenkins Plugin Git to 4.7.1 and include BlueOcean transitive dependencies to pin Git version ([f93b6f93])

## [v0.2.1] - 2021-03-29
### Bug Fixes
 - Missing Git Workflow Heading ([400ba91f])

## [v0.2.0] - 2021-03-29
### Bug Fixes
 - Remove Unfinished Package Support from README.md ([838f8c03])
### Features
 - Git Workflow ([5ba3008d])
 - Add Comments to Jenkinsfile ([fc9f1f2c])

[v0.6.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.5.0...v0.6.0
[9dd0b8cc]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/9dd0b8ccc7a1f5e61949874dc17ef344857ff309
[25802d65]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/25802d6528fdb52c0811a29698e95cc95c67e52f
[2d971dc0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/2d971dc0c667bdab486b7176f0ccf70678f37eee
[08e94856]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/08e9485600a281dce533ead239c97d1b995c0676
[54e7664b]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/54e7664b16559194c83052ce498d487f065ee26f
[a4e42866]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/a4e428665256951f79e75af32a5e86c332d8d404
[e8eaa613]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e8eaa613b2ab2c3c75d309b5e5fbb928b1f09367
[3b00278c]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/3b00278ce865b229a0f9a59a5afeb6c6f1ba981f
[v0.5.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.4.0...v0.5.0
[6cef837f]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/6cef837f2ad7f52db051df36d2f852d8135443eb
[7a49215c]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/7a49215c455820f66a17be561517d4db19e6290a
[df2553d5]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/df2553d581e5e4ed21feffe08970dff7e0e8c155
[90109eae]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/90109eaee5bd352ea60df1fabd27954e8601a96b
[795119b0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/795119b0ade67d7b1256ad4d1f718d5f6f504707
[897bea1f]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/897bea1f368b3f6afcd51e9d660abc3a1a84cb34
[0f6f8292]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/0f6f82924d942ca50a7044f3f307828d7d779b41
[7e6cfa56]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/7e6cfa5600f3ad2f6c1f0612df2812da2dce20f5
[286fc7ac]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/286fc7acd57c2028280f5dda7a54e77b6616e143
[v0.4.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.2...v0.4.0
[32e92cc2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/32e92cc225855bd561a34dab14f225660b3ac667
[c18f2a79]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c18f2a79a10b4a3430f963b2026dd237f1e43258
[c8ea5853]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/c8ea5853f7c370675ec25efd88402c8978f752c1
[e8e393da]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/e8e393dae8451c139be598a2bc7b2eac96b4eeda
[v0.3.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.1...v0.3.2
[43966027]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/43966027eab035600d70036f89dee3647b153ce2
[v0.3.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.3.0...v0.3.1
[8f36ff0f]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/8f36ff0fe30a51a1849f7bb703d2cdd211fa850f
[v0.3.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.3...v0.3.0
[2e91bf85]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/2e91bf8527ac8c2f0ef9a6cfcf34f0712ed9260b
[b3297338]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/b32973383da3decfc0bddd3a030863e292dada3c
[065c6128]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/065c61282925817061e9fc4728038372fb032e5a
[750178ac]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/750178acb9d5c36ef171500367ea5d091d003437
[75447e97]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/75447e977407e0861f076d34d00e5f43b1a1380a
[a4a626fb]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/a4a626fb9b464522df310155ff230934fb1d94c0
[v0.2.3]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.2...v0.2.3
[7f47d72d]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/7f47d72de4f0a795313a805e0dfc51a57a2b4733
[v0.2.2]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.1...v0.2.2
[f93b6f93]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/f93b6f9362651b3d6d1d7f25af70d98a0b944e71
[v0.2.1]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.2.0...v0.2.1
[400ba91f]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/400ba91f189fb8a5c7f2ba5b8e4ce182454c5dd2
[v0.2.0]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/compare/v0.1.0...v0.2.0
[5ba3008d]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/5ba3008de25492d18160fa427398585c2502cb3d
[fc9f1f2c]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/fc9f1f2c93c9fe354e0dfd2017d6c58857af9155
[838f8c03]: https://github.com/Nathan-Smith/poc-jenkins-monorepo/commit/838f8c036d1c5108c7560872d653f160aea77046