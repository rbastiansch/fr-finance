import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'

const rootDir = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), vue()],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          vue: 'vue/dist/vue.esm-bundler.js',
          '~': resolve(rootDir, '../app'),
          '@': resolve(rootDir, '../app')
        }
      },
      define: {
        ...config.define,
        global: 'window'
      }
    }
  }
}

export default config
