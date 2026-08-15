/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const appDir = fileURLToPath(new URL('./app', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': appDir,
      '@': appDir
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['app/**/*.{ts,vue}'],
      exclude: [
        'app/app.vue',
        'app/pages/**',
        'app/services/**',
        '**/*.stories.*',
        '**/*.d.ts'
      ]
    }
  }
})
