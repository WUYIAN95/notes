const fs = require('fs')
const path = require('path')

const shared = require('@elog/shared')
const originalRequest = shared.request
let lastRequestAt = 0

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Yuque limits token requests. Keep the export format unchanged while pacing
// requests and retrying transient 429 responses.
shared.request = async function throttledRequest(url, options) {
  const minimumInterval = 1400
  const elapsed = Date.now() - lastRequestAt
  if (elapsed < minimumInterval) await wait(minimumInterval - elapsed)

  for (let attempt = 0; attempt < 5; attempt += 1) {
    lastRequestAt = Date.now()
    const response = await originalRequest(url, options)
    if (response.status !== 429) return response
    const retryAfter = Number(response.headers && response.headers['retry-after'])
    await wait(Math.max(5000, (retryAfter || 10) * 1000))
  }

  throw new Error(`Yuque API rate limit persisted for ${url}`)
}

const config = process.argv[2]
if (!config) throw new Error('Usage: node elog-sync.js <config-file>')

const cache = config.includes('games') ? 'elog.games.cache.json' : 'elog.software.cache.json'
process.argv = [process.argv[0], path.resolve(__dirname, 'node_modules/@elog/cli/bin/elog.js'), 'sync', '-c', config, '-a', cache, '-e', '.elog.env']
require('@elog/cli/bin/elog.js')
