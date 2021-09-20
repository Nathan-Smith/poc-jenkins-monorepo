import fetch from 'node-fetch'
// https://www.npmjs.com/package/jest-fetch-mock
module.exports = async () => {
  global.fetch = fetch
}
