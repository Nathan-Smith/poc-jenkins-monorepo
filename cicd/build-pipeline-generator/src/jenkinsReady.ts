import axios from 'axios'

export default async function jenkinsReady(jenkinsURL: string): Promise<void> {
  let timedOut = false
  let ready = false
  const handle = setTimeout(() => (timedOut = true), 60000)

  while (!timedOut && !ready) {
    try {
      const res = await axios.get(
        `${jenkinsURL}/pipeline-model-converter/validate`,
        { validateStatus: () => true }
      )

      ready = res.status === 405
    } catch {
      continue
    } finally {
      if (!ready) {
        await new Promise((res) => setTimeout(() => res(null), 2000))
      }
    }
  }
  clearTimeout(handle)

  if (timedOut) {
    throw 'Timed out'
  }
}
