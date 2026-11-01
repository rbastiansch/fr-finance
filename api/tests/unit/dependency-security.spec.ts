import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from '@japa/runner'

/**
 * Regression guard for security advisories in API dependencies.
 * Each entry maps a package to the first patched version that must be installed.
 * See GHSA-jqcg-44mw-7w3h, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p,
 * GHSA-ggr8-5vv4-36mx, GHSA-3f6p-5ww8-9rcr.
 */
const minimumVersions: Array<[string, string]> = [
  ['proxy-addr', '2.0.8'],
  ['brace-expansion', '5.0.11'],
  ['deepmerge-ts', '8.0.0'],
  ['mysql2', '3.22.0'],
]

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

test('security-sensitive dependencies are not below their patched versions', ({ assert }) => {
  for (const [packageName, minimum] of minimumVersions) {
    const manifest = JSON.parse(
      readFileSync(join(process.cwd(), 'node_modules', packageName, 'package.json'), 'utf8')
    ) as { version: string }
    assert.isTrue(
      isAtLeast(manifest.version, minimum),
      `${packageName}@${manifest.version} is below patched version ${minimum}`
    )
  }
})
