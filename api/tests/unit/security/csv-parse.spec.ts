import { test } from '@japa/runner'
import { parse } from 'csv-parse/sync'

test('csv-parse keeps __proto__ columns as own properties', ({ assert }) => {
  const records = parse('__proto__,__proto__,role\nEVIL1,EVIL2,admin', {
    columns: true,
    group_columns_by_name: true,
    skip_empty_lines: true,
  }) as Array<Record<string, unknown>>
  const record = records[0]

  assert.isFalse(Array.isArray(Object.getPrototypeOf(record)))
  assert.isTrue(Object.prototype.hasOwnProperty.call(record, '__proto__'))
  assert.deepEqual(record['__proto__'], ['EVIL1', 'EVIL2'])
  assert.equal(record.role, 'admin')
})