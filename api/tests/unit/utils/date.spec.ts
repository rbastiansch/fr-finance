import { test } from '@japa/runner'
import { dayOnItsFirstSecond, dayOnItsLastSecond } from 'Utils/date.utils'

test('dayOnItsFirstSecond', ({ assert }) => {
  assert.equal(dayOnItsFirstSecond('25/06/2022'), '2022-06-25T00:00:00.000Z')
  assert.equal(dayOnItsFirstSecond('28/02/2022'), '2022-02-28T00:00:00.000Z')
  assert.equal(dayOnItsFirstSecond('01/01/2022'), '2022-01-01T00:00:00.000Z')
})

test('dayOnItsLastSecond', ({ assert }) => {
  assert.equal(dayOnItsLastSecond('25/06/2022'), '2022-06-25T23:59:59.000Z')
  assert.equal(dayOnItsLastSecond('28/02/2022'), '2022-02-28T23:59:59.000Z')
  assert.equal(dayOnItsLastSecond('01/01/2022'), '2022-01-01T23:59:59.000Z')
})
