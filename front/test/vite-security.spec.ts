import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Regression guard for the Vite security update.
 *
 * Vite must resolve to the patched line (>= 8.3.3) in the lockfile.
 * The resolved version is read from front/yarn.lock so the guard also works
 * before dependencies are installed.
 */
const minimumViteVersion = '8.3.3'

function isAtLeast(installed: string, minimum: string): boolean {
  const actual = installed.split('.').map((part) => Number.parseInt(part, 10))
  const expected = minimum.split('.').map((part) => Number.parseInt(part, 10))
  for (let i = 0; i < Math.max(actual.length, expected.length); i += 1) {
    const left = actual[i] ?? 0
    const right = expected[i] ?? 0
    if (left !== right) return left > right
  }
  return true
}

function isVitePackageToken(token: string): boolean {
  // Matches "vite@8.3.3", "vite@^8.2.1", "vite@^6.0.0 ..." but not
  // "vite-node@...", "vite-plugin@...", "vite-dev-rpc@...", etc.
  return /^vite@[\d^]/.test(token)
}

function resolvedViteVersion(): string {
  const lockPath = join(process.cwd(), 'yarn.lock')
  const lines = readFileSync(lockPath, 'utf8').split('\n')

  const headerIndex = lines.findIndex((line) => {
    if (!line.endsWith(':')) return false
    const tokens = line.slice(0, -1).split(/[,\s]+/)
    return tokens.some((token) => isVitePackageToken(token.replace(/^"|"$/g, '')))
  })
  expect(headerIndex, 'vite entry not found in yarn.lock').toBeGreaterThan(-1)

  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const match = /^  version "([^"]+)"/.exec(lines[i])
    if (match !== null) return match[1]
    if (lines[i] === '') break
  }
  throw new Error('vite version not found in yarn.lock')
}

describe('vite resolves past its patched version', () => {
  it(`vite is >= ${minimumViteVersion}`, () => {
    const version = resolvedViteVersion()
    expect(
      isAtLeast(version, minimumViteVersion),
      `vite@${version} is below patched version ${minimumViteVersion}`
    ).toBe(true)
  })
})
