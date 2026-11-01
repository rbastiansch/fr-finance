import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Regression guard for security advisories in front-end dependencies.
 * Each entry maps a package to the first patched version that must be installed.
 * See GHSA-v5rq-49vh-5v5c, GHSA-858h-whjf-mvg5, GHSA-x6jw-m9v5-85vh,
 * GHSA-g4wm-2vf7-vfgr, GHSA-g2v6-rqmx-r4w6, GHSA-qhr7-859c-m2p7,
 * GHSA-6j4f-fj2g-mc7p, GHSA-j22f-vq7h-c4qm, GHSA-2883-xcg3-v3hh,
 * GHSA-587h-7wmj-h5pm, GHSA-wp97-x4hv-qvhp, GHSA-pqg4-j6r4-53mv,
 * GHSA-68fv-2mgg-jv7q, GHSA-vp8m-p9jh-q5pm, GHSA-8hrf-8g6f-7xwp,
 * GHSA-hqq3-7jhf-c5jx, GHSA-jc66-7q78-782g, GHSA-7wch-p9px-956x,
 * GHSA-5x38-2vff-x55p.
 */
const minimumVersions: Record<string, string> = {
  'simple-git': '4.0.1',
  '@simple-git/argv-parser': '2.0.1',
  '@vue/server-renderer': '3.5.42',
  'brace-expansion': '5.0.11',
  devalue: '5.9.3',
  'js-yaml': '4.3.2',
  'launch-editor': '2.14.2',
  seroval: '1.6.8',
  'shell-quote': '1.11.0',
  'source-map-js': '1.2.2',
  undici: '8.10.2',
  'node-forge': '1.4.1',
}

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

function installedVersion(packageName: string): string {
  const manifestPath = join(process.cwd(), 'node_modules', packageName, 'package.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { version: string }
  return manifest.version
}

describe('security-sensitive dependencies resolve past their patched versions', () => {
  for (const [packageName, minimum] of Object.entries(minimumVersions)) {
    it(`${packageName} is >= ${minimum}`, () => {
      const version = installedVersion(packageName)
      expect(
        isAtLeast(version, minimum),
        `${packageName}@${version} is below patched version ${minimum}`
      ).toBe(true)
    })
  }
})
