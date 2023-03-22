const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true
      }
    }
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          '~': path.resolve(__dirname, '../')
        }
      },
      define: {
        ...config.define,
        global: 'window'
      }
    }
  }
}
