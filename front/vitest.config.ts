/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '~': path.resolve(__dirname, './')
    },
    setupFiles: './test/setup.ts',
    coverage: {
      all: true,
      exclude: [
        '.nuxt',
        '.storybook',
        'dist',
        'storybook-static',
        'stories',
        'test',
        '*.js',
        '*.ts'
      ]
    },
    typecheck: {
      tsconfig: './test/tsconfig.json'
    }
  }
})
