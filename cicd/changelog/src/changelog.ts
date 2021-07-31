import fs from 'fs/promises'
import { existsSync } from 'fs'
import Mustache from 'mustache'
import path from 'path'
import simpleGit from 'simple-git'
import semver from 'semver'
import { DateTime } from 'luxon'

interface ConventionalCommit {
  type?: string
  scope?: string
  breaking: boolean
  description?: string
}

const fileName = 'CHANGELOG.md'

/**
 * Regexp Breakdown (3 spaces to split the 'parts')
 * ^   (\w+)   (?:\(([\w:]+)\)?)?   (!?)   :   (.+)
 * |     |             |             |     |     |
 * |     |             |             |     |     Commit description
 * |     |             |             |     Start of the commit description
 * |     |             |             Does commit contain a breaking change?
 * |     |             Optional Scope of the commit, just want the scope within the ()
 * |     Type of the commit
 * Beginning of the commit message
 *
 * Examples (excludes the first element which is the whole string, _ indicates undefined):
 *    feature: Hello World
 *      [ "feature", _,   _, "Hello World"]
 *    feature!: Hello World
 *      [ "feature", _,   !, "Hello World"]
 *    feature(doc): Hello World
 *      [ "feature", doc, _, "Hello World"]
 *    feature(doc)!: Hello World
 *      [ "feature", doc, !, "Hello World"]
 *
 */
const conventionalCommit = /^(\w+)(?:\(([\w:]+)\)?)?(!?):(.+)/

/**
 * Regexp Breakdown (3 spaces to split the 'parts')
 * v\d+\.\d+\.\d+   (?:-[\d\w]+(?:\.\d+)?)?
 *      |                    |
 *      |                    Pre-release part (-dev.0)
 *      Version part (v1.0.0)
 */
const releaseTag = /v\d+\.\d+\.\d+(?:-[\d\w]+(?:\.\d+)?)?/

/**
 * Regexp Breakdown (3 spaces to split the 'parts')
 * ([a-f\d]+)   \]\)   $
 *     |         |     |
 *     |         |     End of the line
 *     |         The line ends with a ])
 *     Commit Hash...
 */
const commitHash = /([a-f\d]+)\]\)$/

/**
 * Parses the Commit Message into a parts that make up the Conventional Commit Spec
 * @param logMessage Commit message, obtained via git log
 * @returns `ConventionalCommit` object
 */
function parseCommit(logMessage: string): ConventionalCommit {
  const [, type, scope, breaking, description] =
    logMessage.match(conventionalCommit) ?? <(string | undefined)[]>[]

  return {
    breaking: breaking !== undefined,
    description,
    scope,
    type,
  }
}

/**
 * Combines existing CHANGELOG.md (if it exists) and a generated CHANGELOG.md that uses conventional commit history and semver tags
 */
export default async function changelog(): Promise<void> {
  // Read the existing CHANGELOG.md file (if it exists) so it can be used as a reference later to merge the generated changelog with the manual edits / corrections to commit descriptions
  const existing = existsSync(fileName)
    ? await fs.readFile(fileName, 'utf8')
    : ''

  const git = simpleGit()

  // Generates a changelog and merges it with the existing changelog line by line,
  // matching the commit hash to override the generated line with the existing line,
  // this can be found on a different line then what was originally in the existing changelog.
  await fs.writeFile(
    fileName,
    Mustache.render(
      await fs.readFile(path.resolve(__dirname, 'changelog.mustache'), 'utf8'),
      {
        tags: (
          await Promise.all(
            [
              // Only want tags that are part of a release (v1.0.0) and not a pre-release (v1.0.0-dev.1)
              ...(await git.tags()).all.filter(
                (tag) =>
                  semver.valid(tag, {
                    includePrerelease: true,
                    loose: false,
                  }) && semver.prerelease(semver.clean(tag) ?? '') === null
              ),
              // Add in HEAD to find commits that are Unreleased
              'HEAD',
            ]
              // Latest releases first, Unreleased changes on top.
              .reverse()
              .map(async (ref, refsIndex, refs) => {
                const commits =
                  refsIndex < refs.length - 1
                    ? // Get logs between two versions (or HEAD in the first case), i.e v1.2.0..v1.3.0
                      (
                        await git.log({ from: refs[refsIndex + 1], to: ref })
                      ).all
                        .map((log, logsIndex) => {
                          const {
                            type,
                            scope,
                            breaking,
                            description,
                          } = parseCommit(log.message)
                          // Omit the hash of the latest Unreleased commit, this is the ensure running `changelog` is consistent,
                          // as in once a commit is made with the latest changelog update applied,
                          // running the command again will yield no change
                          const hashFull =
                            ref === 'HEAD' && logsIndex === 0
                              ? undefined
                              : log.hash
                          return {
                            breaking,
                            type,
                            scope,
                            description:
                              description?.trim() ?? log.message.trim(),
                            body: log.body.trim(),
                            hashShort: hashFull?.substr(0, 8),
                            hashFull,
                            tagDate:
                              log.refs.match(releaseTag)?.[0] === ref
                                ? log.date
                                : undefined, // If the log / commit contains a release tag excluding pre-release tags, store its date, its used to render a date for a given release heading
                          }
                        })
                        // Discard all Merge commits
                        .filter(
                          (commit) =>
                            commit.description.match(/^Merge.*/) === null
                        )
                    : []

                // Find all feature commits, this includes all commits that didn't follow the Conventional Commit Spec
                const featureCommits = commits.filter(
                  (commit) =>
                    commit.type?.match(/feature|feat/) ||
                    commit.type === undefined
                )

                // Find all bugfix commits, including hotfix commits.
                // Since prior history used a different standard for hotfix commits,
                // this looks at commits with the `release` type and read the `hotfix` message contained within
                const bugfixCommits = commits
                  .filter((commit) => commit.type?.match(/bugfix|fix|release/))
                  .map((commit) => {
                    const { type, scope, description } = parseCommit(
                      commit.body
                    )
                    const isBugfix = commit.type !== 'release'
                    return {
                      ...commit,
                      scope: isBugfix ? commit.scope : scope,
                      description: isBugfix
                        ? commit.description
                        : description?.trim(),
                      isHotfix: type === 'hotfix',
                      isRelease: !isBugfix,
                    }
                  })
                  // Discard any release commits that are not hotfix commits
                  .filter(
                    (commit) =>
                      (commit.isHotfix && commit.isRelease) || !commit.isRelease
                  )

                const commitWithTagDate = commits.find(
                  (commit) => commit.tagDate !== undefined
                )?.tagDate

                let tagDate = ''
                if (commitWithTagDate) {
                  tagDate = DateTime.fromISO(commitWithTagDate).toFormat(
                    'yyyy-MM-dd'
                  )
                }

                return {
                  name: ref !== 'HEAD' ? ref : 'Unreleased',
                  tagDate,
                  ref,
                  prevRef: refs[refsIndex + 1],
                  ifContainsFeatures: featureCommits.length > 0,
                  featureCommits: featureCommits,
                  ifContainsBugfixes: bugfixCommits.length > 0,
                  bugfixCommits: bugfixCommits,
                  commits: [...featureCommits, ...bugfixCommits],
                }
              })
          )
        ).filter((tag) => tag.commits.length > 0),
      }
    )
      // Go line by line comparing the existing changelog, any match the line from the existing changelog is applied.
      .split('\n')
      .map(
        (updatedLine) =>
          existing
            .split('\n')
            .filter((existingLine) => existingLine.match(commitHash)?.[1])
            .find(
              (existingLine) =>
                updatedLine.match(commitHash)?.[1] ===
                existingLine.match(commitHash)?.[1]
            ) ?? updatedLine
      )
      .join('\n')
      .slice(0, -1),
    'utf8'
  )
}
