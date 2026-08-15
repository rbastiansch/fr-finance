import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  ignores: ['generated/**', 'database/schema.ts'],
})
