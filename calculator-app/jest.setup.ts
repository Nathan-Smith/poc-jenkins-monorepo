import fetch from 'node-fetch'
// https://www.npmjs.com/package/jest-fetch-mock
module.exports = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global.fetch as any) = fetch
}
